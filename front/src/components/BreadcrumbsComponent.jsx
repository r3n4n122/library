import { 
  Link, 
  Breadcrumbs, 
  Grid 
} from '@mui/material';

export const BreadcrumbsComponent = ({ links }) => {
  return (
    <Grid container
      sx={{
        m: 0, 
        bgcolor: "black", 
        p: 2,
      }}
      >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          fontSize: '1rem',
          fontWeight: 500,
          color: "grey.300"
        }}
      >
        {links?.map((item) => (
          <Link
            underline="hover"
            color="inherit"
            href={item?.url}
            sx={{
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              fontSize: '25px',
              fontWeight: 500,
            }}
            key={item?.url || item?.value}
          >
            {item.value}
          </Link>
        ))}
      </Breadcrumbs>
    </Grid>
  );
};
