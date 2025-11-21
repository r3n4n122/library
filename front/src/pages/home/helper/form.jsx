import { 
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  Box
} from "@mui/material";
import { InputTextField } from "../../../components/inputs/InputTextField";
import { PostInstance } from "../../../services/hooks/api";
import { ToastContainer, toast } from 'react-toastify';

export const Form = ({ formik, data }) => {

  const postBook = ( isbn ) => {
    PostInstance(isbn, "/books")
    .then((response) => {
      toast.success(response?.data?.message)

    })
    .catch((error) => {
      toast.error(error?.response?.data?.data)
    })
  }

  return (
    <Grid item xs={11} sm={8} md={6}>
      <Paper 
        sx={{ 
          p: 4, 
          textAlign: 'center', 
          borderRadius: 3, 
          boxShadow: 8,
          backgroundColor: "#f9f9f9"
        }}
      >
        <ToastContainer 
          autoClose={1000} 
          theme="colored" 
        />
        <Stack spacing={3} alignItems="center">
          <Grid container spacing={2} >
            <Grid item xs={10}>
              <InputTextField 
                placeholder="Digite o ISBN" 
                formik={formik}
                label="ISBN"
                id="isbn"
              />
            </Grid>
            <Grid item xs={1}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                sx={{ px: 5, py: 1.5, fontWeight: 600, p: "16px 50px 16px 50px"}}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>

          {data && (
            <Box 
              sx={{ 
                width: "100%", 
                mt: 3, 
                p: 3, 
                borderRadius: 2, 
                backgroundColor: "#fff", 
                boxShadow: 3 
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Título:
                  </Typography>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    {data.title || "-"}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Número de páginas:
                  </Typography>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    {data.page_count || "-"}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Ano da publicação:
                  </Typography>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    {data.published_at || "-"}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          )}
        </Stack>
        
        <Grid container justifyContent={"end"} mt={2}>
          <Button 
            variant="contained" 
            color="success" 
            sx={{ px: 5, py: 1.5, fontWeight: 600 }}
            onClick={() => {
              postBook(formik?.values)
            }}
          >
            Adicionar Livro
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};
