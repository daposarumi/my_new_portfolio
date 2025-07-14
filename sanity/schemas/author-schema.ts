import {defineField, defineType} from 'sanity';
    
    const author = {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {source: 'name'}
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {hotspot: true},
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt',
                    type: 'string'
                })
                
            ]
        },
        {
            name: 'url',
            title: 'URL',
            type: 'url'
        }
        
    ]
};

export default author;