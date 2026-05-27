#!/usr/bin/env node

import { z } from "zod";

// Multilingual dictionary schema - equivalent to Python multilangdict
const multiLangDict = z.object({
    cs: z.string(),
    en: z.string(),
});

// Date schema - converts string dates to Date objects
const dateSchema = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .transform((str) => new Date(str));

// URL schema
const urlSchema = z.string().url();

// Provider schema - equivalent to Python type_provider
const providerSchema = z.object({
    name: multiLangDict,
    description: multiLangDict,
    organization: z.string(),
    contacts: z.array(
        z.object({
            role: multiLangDict,
            persons: z.array(z.string()),
        })
    ),
    data_access: z
        .array(
            z.object({
                role: multiLangDict,
                access_point: z.array(z.string()),
            })
        )
        .optional(),
    conformance: z.record(z.string(), z.any()).optional(),
    processes: z.record(
        z.string(),
        z.object({
            name: multiLangDict,
            description: multiLangDict,
            terms_and_conditions: z.array(z.string()).optional(),
            additional_description: multiLangDict.optional(),
        })
    ),
});

// Source schema - equivalent to Python type_source
const sourceSchema = z.object({
    name: multiLangDict,
    description: multiLangDict,
    additional_description: multiLangDict.optional(),
    content: z.object({
        content_type: z.string(),
        resource_type: z.string(),
        dataset: z
            .object({
                category: z.array(z.string()),
                detailed_type: z.array(z.string()).optional(),
            })
            .optional(),
        service: z
            .object({
                category: z.array(z.string()),
                detailed_type: z.array(z.string()).optional(),
            })
            .optional(),
        language: z.array(z.string()),
    }),
    pattern: z
        .object({
            name: multiLangDict,
            file: multiLangDict.optional(),
        })
        .optional(),
    linked_sources: z.array(z.string()).optional(),
    temporal: z.object({
        start_date: dateSchema,
        end_date: dateSchema.optional(),
        last_update: dateSchema.optional(),
    }),
    coverage: z.object({
        area: z.string(),
        network: z.array(z.string()),
        description: multiLangDict.optional(),
    }),
    transport_modes: z.array(z.string()),
    responsibilities: z.object({
        publisher: z.string(),
        data_owner: z.string().optional(),
    }),
    conditions_of_use: z.object({
        contract_or_licence: z.string(),
        terms_and_conditions: z.string().optional(),
    }),
    access_info: z.object({
        formats: z.array(z.string()),
        protocols: z.array(z.string()),
        access_point: z.array(z.string()),
        pls_key: z.string().optional(),
    }),
    quality_information: z.object({
        status: multiLangDict,
        status_description: multiLangDict.optional(),
        update_frequency: z.string(),
        quality_assesment: multiLangDict,
        nb_assesment_date: z.string().optional(),
        ec_acts: z.array(z.string()).optional(),
    }),
});

// Format schema - equivalent to Python type_format
const formatSchema = z.object({
    name: multiLangDict,
    version_info: z
        .object({
            version: z.string(),
            publish_date: dateSchema,
        })
        .optional(),
    encoding: z.string().optional(),
    syntax: z.string(),
    grammar: z.string().optional(),
    model: z.string(),
    model_version: z.string().optional(),
    model_description: z.string().optional(),
    model_extension: z.string().optional(),
    description: multiLangDict,
    additional_description: multiLangDict.optional(),
    publications: z.record(z.string(), z.array(z.enum(["cs", "en", "en-cs"]))).optional(),
    linked_documents: z
        .array(
            z.object({
                description: multiLangDict,
                language: z.string(),
                web: urlSchema,
            })
        )
        .optional(),
});

// Protocol schema - equivalent to Python type_protocol
const protocolSchema = z.object({
    name: multiLangDict,
    version_info: z
        .object({
            version: z.string(),
            publish_date: dateSchema,
        })
        .optional(),
    interface: z.string(),
    communication_method: z.string().optional(),
    description: multiLangDict,
    additional_description: multiLangDict.optional(),
    publications: z.record(z.string(), z.array(z.enum(["cs", "en"]))).optional(),
});

// Organization schema - equivalent to Python type_organization
const organizationSchema = z.object({
    name: multiLangDict,
    department: multiLangDict.optional(),
    address: z.string().optional(),
    web: z.array(urlSchema).optional(),
});

// Person schema - equivalent to Python type_person
const personSchema = z.object({
    name: z.string().optional(),
    title: multiLangDict.optional(),
    organization: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
});

// Access point schema - equivalent to Python type_access_point
const accessPointSchema = z.object({
    web: z.array(urlSchema).optional(),
    note: multiLangDict.optional(),
    status: multiLangDict.optional(),
});

// Conformance schema - equivalent to Python type_conformance
const conformanceSchema = z.object({
    decision_ref: z.string(),
    description: multiLangDict,
});

// Terms and conditions schema - equivalent to Python type_terms_and_conditions
const termsAndConditionsSchema = z.object({
    name: multiLangDict,
    publications: z.record(z.string(), z.array(z.enum(["cs", "en"]))),
});

// Registry metadata schema - equivalent to Python type_registry_metadata
const registryMetadataSchema = z.object({
    metadata_date: dateSchema,
    language: z.array(z.string()),
    contacts: z.array(
        z.object({
            role: multiLangDict,
            persons: z.array(z.string()),
        })
    ),
    version_history: z
        .array(
            z.object({
                id: z.string(),
                type: z.string(),
                date: dateSchema,
                description: multiLangDict,
            })
        )
        .optional(),
});

// Main configuration schema - equivalent to Python type_confschema
const configSchema = z.object({
    providers: z.record(z.string(), providerSchema),
    sources: z.record(z.string(), sourceSchema),
    formats: z.record(z.string(), formatSchema),
    protocols: z.record(z.string(), protocolSchema),
    pubformats: z.record(z.string(), z.string()), // simplified from Python
    organizations: z.record(z.string(), organizationSchema),
    persons: z.record(z.string(), personSchema),
    access_points: z.record(z.string(), accessPointSchema).optional(),
    conformance: z.record(z.string(), conformanceSchema),
    terms_and_conditions: z.record(z.string(), termsAndConditionsSchema),
    registry_metadata: registryMetadataSchema,
});

export {
    configSchema,
    multiLangDict,
    dateSchema,
    urlSchema,
    providerSchema,
    sourceSchema,
    formatSchema,
    protocolSchema,
    organizationSchema,
    personSchema,
    accessPointSchema,
    conformanceSchema,
    termsAndConditionsSchema,
    registryMetadataSchema,
};
