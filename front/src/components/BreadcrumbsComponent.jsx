import { 
  Link, 
  Breadcrumbs, 
  Grid, 
  Box 
} from '@mui/material';

export const BreadcrumbsComponent = ({ links, actionButton }) => {
  return (
    <Grid 
      container
      sx={{
        m: 0, 
        bgcolor: "black", 
        p: 2,
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          fontSize: '25px',
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
      {actionButton && <Box>{actionButton}</Box>}
    </Grid>
  );
};
