export const columns = [
	{
		name: 'ISBN',
		selector: row => row.isbn,
	},
	{
		name: 'Título',
		selector: row => row.title,
	},
  {
    name: "Ano de publicação",
    selector: row => row.published_at,
  },
  {
    name: "Numero de paginas",
    selector: row => row.page_count,
  }
];
