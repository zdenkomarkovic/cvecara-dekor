import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Kategorija",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naziv",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
    }),
  ],
});
