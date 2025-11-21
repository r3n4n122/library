import { GetInstance } from "../../services/hooks/api";
import { InputTextField } from "../../components/inputs/InputTextField";
import { BreadcrumbsComponent } from "../../components/BreadcrumbsComponent";
import { useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { Form } from "./helper/form";
export default function Home() {
  const [data, setData] = useState({})

  const formik = useFormik({
    initialValues: {
      book: {
        isbn: "",
      }
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
        <ToastContainer theme="colored"/>
        <Grid item xs={12}>
          <BreadcrumbsComponent
            links={[
              { value: "Home", url: "/" }
            ]}
          />
        </Grid>
        <Form formik={formik} data={data} />
      </Grid>
    </form>
  );
}