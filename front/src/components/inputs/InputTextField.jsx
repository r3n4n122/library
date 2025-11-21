import { TextField, Grid } from '@mui/material';
import { getIn } from 'formik';

export const InputTextField = ({ formik, id, placeholder, label }) => {
  const value = getIn(formik.values, id);
  return (
    <Grid item sx={{ width: '100%' }}>
      <TextField
        variant="outlined"
        fullWidth
        label={ label || ""}
        placeholder={placeholder}
        value={value}
        onChange={(event) => formik.setFieldValue(id, event.target.value)}
        onBlur={formik.handleBlur}
      />
    </Grid>
  );
};
