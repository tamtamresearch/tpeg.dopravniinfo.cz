#!/usr/bin/env node

import { readFileSync } from "fs";
import { parse } from "yaml";
import { configSchema } from "./config-schema.js";

/**
 * Validate configuration file against schema
 * Replicates the Python function validate_conf()
 */
function validateConfig(configPath = "conf.yaml") {
    try {
        console.log(`Validating configuration: ${configPath}`);

        // Read and parse YAML file
        const fileContent = readFileSync(configPath, "utf8");
        const data = parse(fileContent);

        // Validate against schema
        const validatedData = configSchema.parse(data);

        console.log("✅ Configuration validation passed");

        // Return validation statistics
        const stats = {
            providers: Object.keys(validatedData.providers || {}).length,
            sources: Object.keys(validatedData.sources || {}).length,
            formats: Object.keys(validatedData.formats || {}).length,
            protocols: Object.keys(validatedData.protocols || {}).length,
            organizations: Object.keys(validatedData.organizations || {}).length,
            persons: Object.keys(validatedData.persons || {}).length,
        };

        console.log("📊 Configuration statistics:");
        for (const [key, count] of Object.entries(stats)) {
            console.log(`   ${key}: ${count}`);
        }

        return { success: true, data: validatedData, stats };
    } catch (error) {
        console.error("❌ Configuration validation failed");

        if (error.name === "ZodError") {
            console.error("Schema validation errors:");
            error.issues.forEach((err, index) => {
                const path = err.path.join(".");
                console.error(`  ${index + 1}. ${path}: ${err.message}`);
                if (err.code === "invalid_type") {
                    console.error(`     Expected: ${err.expected}, Received: ${err.received}`);
                }
            });
        } else {
            console.error(`Error: ${error.message}`);
        }

        return { success: false, error };
    }
}

/**
 * Validate specific sections of the configuration
 */
function validateSection(data, sectionName, schema) {
    try {
        const section = data[sectionName];
        if (!section) {
            throw new Error(`Section '${sectionName}' not found in configuration`);
        }

        const validatedSection = schema.parse(section);
        console.log(`✅ Section '${sectionName}' validation passed`);
        return { success: true, data: validatedSection };
    } catch (error) {
        console.error(`❌ Section '${sectionName}' validation failed: ${error.message}`);
        return { success: false, error };
    }
}

/**
 * Check cross-references between configuration sections
 */
function validateCrossReferences(data) {
    const errors = [];
    const warnings = [];

    // Check if all referenced entities exist
    if (data.sources) {
        for (const [sourceId, source] of Object.entries(data.sources)) {
            // Check publisher exists in providers
            if (source.responsibilities?.publisher && !data.providers?.[source.responsibilities.publisher]) {
                errors.push(
                    `Source '${sourceId}' references non-existent provider '${source.responsibilities.publisher}'`
                );
            }

            // Check formats exist
            if (source.access_info?.formats) {
                for (const formatId of source.access_info.formats) {
                    if (!data.formats?.[formatId]) {
                        errors.push(`Source '${sourceId}' references non-existent format '${formatId}'`);
                    }
                }
            }

            // Check protocols exist
            if (source.access_info?.protocols) {
                for (const protocolId of source.access_info.protocols) {
                    if (!data.protocols?.[protocolId]) {
                        errors.push(`Source '${sourceId}' references non-existent protocol '${protocolId}'`);
                    }
                }
            }

            // Check linked sources exist
            if (source.linked_sources) {
                for (const linkedSourceId of source.linked_sources) {
                    if (!data.sources[linkedSourceId]) {
                        errors.push(`Source '${sourceId}' references non-existent linked source '${linkedSourceId}'`);
                    }
                }
            }

            // Check access points exist
            if (source.access_info?.access_point) {
                for (const accessPointId of source.access_info.access_point) {
                    if (!data.access_points?.[accessPointId]) {
                        warnings.push(
                            `Source '${sourceId}' references access point '${accessPointId}' which may not exist`
                        );
                    }
                }
            }
        }
    }

    // Check providers reference existing organizations and persons
    if (data.providers) {
        for (const [providerId, provider] of Object.entries(data.providers)) {
            if (provider.organization && !data.organizations?.[provider.organization]) {
                errors.push(`Provider '${providerId}' references non-existent organization '${provider.organization}'`);
            }

            // Check contacts reference existing persons
            if (provider.contacts) {
                for (const contact of provider.contacts) {
                    if (contact.persons) {
                        for (const personId of contact.persons) {
                            if (!data.persons?.[personId]) {
                                errors.push(
                                    `Provider '${providerId}' contact references non-existent person '${personId}'`
                                );
                            }
                        }
                    }
                }
            }
        }
    }

    return { errors, warnings };
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
    const configPath = process.argv[2] || "conf.yaml";

    try {
        const result = validateConfig(configPath);

        if (result.success) {
            // Also check cross-references
            const crossRefCheck = validateCrossReferences(result.data);

            if (crossRefCheck.errors.length > 0) {
                console.error("\n❌ Cross-reference validation errors:");
                crossRefCheck.errors.forEach((error, index) => {
                    console.error(`  ${index + 1}. ${error}`);
                });
                process.exit(1);
            }

            if (crossRefCheck.warnings.length > 0) {
                console.warn("\n⚠️  Cross-reference warnings:");
                crossRefCheck.warnings.forEach((warning, index) => {
                    console.warn(`  ${index + 1}. ${warning}`);
                });
            }

            console.log("\n🎉 All validation checks passed!");
            process.exit(0);
        } else {
            process.exit(1);
        }
    } catch (error) {
        console.error(`Fatal error: ${error.message}`);
        process.exit(1);
    }
}

export { validateConfig, validateSection, validateCrossReferences };
