import { BreadcrumbsComponent } from "../../components/BreadcrumbsComponent";
import { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import DataTable from 'react-data-table-component';
import { columns } from "./helper/constants";
import { GetInstance, DeleteInstance } from "../../services/hooks/api";
import { ToastContainer, toast } from 'react-toastify';

export default function Books() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchBooks = () => {
    const params = {
      page,
      per_page: perPage,
      search: search || undefined,
    };
    GetInstance(params, "/books")
      .then((response) => {
        setData(response.data.data.data);
        setTotalCount(response.data.data.total_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, [page, perPage, search]);

  const handleDelete = (id) => {
    DeleteInstance(null, `/books/${id}`)
    .then((response) => {
      toast.success(response?.data?.message)
      fetchBooks();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    })
  };

  const columnsWithDelete = [
    ...columns,
    {
      name: "Ações",
      cell: (book) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(book.id)}
        >
          Excluir
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <BreadcrumbsComponent
          links={[
            { value: "Home", url: "/" },
            { value: "Livros", url: "/books"}
          ]}
        />
      </Grid>
      <ToastContainer 
        autoClose={1000} 
        theme="colored"
      />
      <Grid item xs={10}>
        <TextField
          fullWidth
          size="small"
          label="Pesquisar"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ marginBottom: 10, backgroundColor: "white" }}
        />

        <DataTable
          columns={columnsWithDelete}
          data={data}
          pagination
          paginationServer
          paginationTotalRows={totalCount}
          onChangePage={(page) => setPage(page)}
          component
          customStyles={{
            headCells: {
              style: { fontSize: '20px', fontWeight: 'bold' }
            },
            cells: {
              style: { fontSize: '20px' }
            },
          }}
          onChangeRowsPerPage={(newPerPage) => {
            setPerPage(newPerPage);
          }}
          noDataComponent={
            <Grid style={{ padding: "20px", fontSize: "20px" }}>
              Nenhum registro encontrado
            </Grid>
          }
          highlightOnHover
          pointerOnHover
        />
      </Grid>
    </Grid>
  );
}
