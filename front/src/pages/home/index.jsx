import { GetInstance } from "../../services/hooks/api";
import { BreadcrumbsComponent } from "../../components/BreadcrumbsComponent";
import { useState } from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { Form } from "./helper/form";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState({})

  const formik = useFormik({
    initialValues: {
      isbn: "",
    },
    onSubmit: (values) => {
      GetInstance(values, "/books/search")
      .then((response) => {
        setData(response?.data?.data)
        toast.success(response?.data?.message)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.data)
      })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <ToastContainer 
          autoClose={1000}
          theme="colored"
        />
        <Grid item xs={12}>
          <BreadcrumbsComponent
            links={[
              { value: "Home", url: "/" }
            ]}
            actionButton={
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() =>  navigate('/books')}
              >
                Livros Salvos
              </Button>
            }
          />
        </Grid>
        <Form formik={formik} data={data} />
      </Grid>
    </form>
  );
}