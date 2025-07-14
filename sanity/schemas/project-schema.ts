// schemas/project.ts

import { defineField, defineType } from 'sanity';

const project = defineType({
    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name' },
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }]
        }),
        defineField({
            name: "images",
            title: "Gallery Images",
            type: "array",
            of: [
                {
                    type: "image",
                    options: { hotspot: true }
                }
            ]
        }),

        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt',
                    type: 'string',
                }),
            ],
        }),

        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [
                {
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Journalism', value: 'journalism' },
                            { title: 'Documentary Photography', value: 'documentary-photography' },
                            { title: 'Writing', value: 'writing' },
                            { title: 'Web Creation', value: 'web-creation' },
                        ],
                        layout: 'tags',
                    },
                },
            ],
        }),
    ],
});

export default project;
