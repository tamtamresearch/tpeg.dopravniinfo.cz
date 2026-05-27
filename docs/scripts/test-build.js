#!/usr/bin/env node

import { compileConfig } from "./compile-config.js";
import { validateConfig, validateCrossReferences } from "./validate-config.js";
import { existsSync, readFileSync } from "fs";
import { parse } from "yaml";

console.log("🧪 Testing NDIC build tools...\n");

async function runTests() {
    const tests = [testCompilation, testValidation, testCrossReferences, testFileStructure];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
        try {
            await test();
            console.log(`✅ ${test.name}: PASSED`);
            passed++;
        } catch (error) {
            console.error(`❌ ${test.name}: FAILED - ${error.message}`);
            failed++;
        }
    }

    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);

    if (failed > 0) {
        process.exit(1);
    } else {
        console.log("🎉 All tests passed!");
        process.exit(0);
    }
}

async function testCompilation() {
    // Test basic compilation
    if (!existsSync("conf_files")) {
        throw new Error("conf_files directory not found");
    }

    await compileConfig("conf_files", "conf.yaml", true);

    if (!existsSync("conf.yaml")) {
        throw new Error("conf.yaml was not created");
    }

    // Test that compiled file is valid YAML
    const content = readFileSync("conf.yaml", "utf8");
    const data = parse(content);

    if (!data || typeof data !== "object") {
        throw new Error("Compiled YAML is not a valid object");
    }

    // Check that main sections exist
    const requiredSections = ["providers", "sources", "formats", "protocols", "organizations", "persons"];
    for (const section of requiredSections) {
        if (!data[section]) {
            throw new Error(`Missing required section: ${section}`);
        }
    }
}

async function testValidation() {
    const result = validateConfig("conf.yaml");

    if (!result.success) {
        throw new Error(`Validation failed: ${result.error?.message || "Unknown error"}`);
    }

    // Check statistics make sense
    if (!result.stats) {
        throw new Error("Validation should return statistics");
    }

    const expectedSections = ["providers", "sources", "formats", "protocols"];
    for (const section of expectedSections) {
        if (typeof result.stats[section] !== "number") {
            throw new Error(`Statistics missing count for section: ${section}`);
        }
    }
}

async function testCrossReferences() {
    const content = readFileSync("conf.yaml", "utf8");
    const data = parse(content);

    const crossRefResult = validateCrossReferences(data);

    // We expect some cross-references to exist and be valid
    // This is more of a smoke test - we don't expect zero errors necessarily
    // but we want to make sure the function runs without crashing

    if (!Array.isArray(crossRefResult.errors) || !Array.isArray(crossRefResult.warnings)) {
        throw new Error("Cross-reference validation should return arrays of errors and warnings");
    }

    console.log(
        `   Cross-ref check: ${crossRefResult.errors.length} errors, ${crossRefResult.warnings.length} warnings`
    );
}

async function testFileStructure() {
    // Test that the Node.js scripts exist and are executable
    const requiredFiles = [
        "scripts/compile-config.js",
        "scripts/validate-config.js",
        "scripts/config-schema.js",
        "scripts/watch-config.js",
        "scripts/ndic-build.js",
    ];

    for (const file of requiredFiles) {
        if (!existsSync(file)) {
            throw new Error(`Required script file missing: ${file}`);
        }
    }

    // Test package.json structure
    const packageContent = readFileSync("package.json", "utf8");
    const packageJson = JSON.parse(packageContent);

    if (!packageJson.scripts?.compile || !packageJson.scripts?.validate) {
        throw new Error("package.json missing required scripts");
    }

    if (!packageJson.dependencies?.yaml || !packageJson.dependencies?.zod) {
        throw new Error("package.json missing required dependencies");
    }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runTests();
}

export { runTests };
