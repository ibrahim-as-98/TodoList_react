// mui import
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// hooks import
import { useContext } from "react";
import { useTodos } from "../contexts/todoContext";
import { Snackbarcontext } from "../contexts/SnackbarContext";


export default function Todo({ todo, opendeletdialog, openeditdialog }) {
  // hooks
  const { dispatch } = useTodos();
  const { showHidesnackbar } = useContext(Snackbarcontext);
// ************

  function handelcheckclickfun() {
    dispatch({ type: "cheked", payload: todo });
    showHidesnackbar("تم تغير حالة  المهمه");
  }

  return (
    <>
      <Card
        className="todocard"
        sx={{
          minWidth: "md",
          marginTop: 3,
          backgroundColor: "#283593",
          color: "white",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={7} style={{ maxWidth: "300px" }}>
              <Typography variant="h4" sx={{ textAlign: "right" }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.detailes}
              </Typography>
            </Grid>
            <Grid
              xs={5}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="iconButton"
                style={{
                  color: todo.iscompleated ? "white" : "#8bc34a",
                  background: todo.iscompleated ? "#8bc34a" : "white",
                  border: "solid 2px #8bc34a",
                }}
                onClick={() => {
                  handelcheckclickfun();
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1767aa",
                  background: "white",
                  border: "solid 2px #1767aa",
                }}
                onClick={() => {
                  openeditdialog(todo);
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid 2px #b23c17",
                }}
                onClick={() => {
                  opendeletdialog(todo);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
