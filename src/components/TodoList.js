// mui import
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// components import
import Todo from "./Todo";
// hooks
import { useContext, useState, useEffect, useMemo } from "react";
import { Snackbarcontext } from "../contexts/SnackbarContext";
import {  useTodos } from "../contexts/todoContext";


export default function TodoList() {
  // states
  const [titleInput, settitleInput] = useState("");
  const [displayTodosType, setdisplayTodosType] = useState("all");
  const [showdeleltdialog, setshowdeletdialog] = useState(false);
  const [dialogtodo, setdialogtodo] = useState("");
  const [showeditdialog, setshoweditdialog] = useState(false);
  // context*****
  const { showHidesnackbar } = useContext(Snackbarcontext);
  const { Todos, dispatch } = useTodos();


// Category of todo****************
  const completed = useMemo(() => {
    return Todos.filter((t) => {
      return t.iscompleated;
    });
  }, [Todos]);

  const noncompleted = useMemo(() => {
    return Todos.filter((t) => {
      return !t.iscompleated;
    });
  }, [Todos]);

  let displayTodos = Todos;
  if (displayTodosType == "completed") {
    displayTodos = completed;
  } else if (displayTodosType == "noncompleted") {
    displayTodos = noncompleted;
  }
  function uppdatedisplayTodos(e) {
    setdisplayTodosType(e.target.value);
  }
// *********
  useEffect(() => {
    dispatch({ type: "loade" });
  }, []);



  // handel adde**********************
  function hndelAddCLick() {
    dispatch({ type: "added", payload: { newtitle: titleInput } });
    settitleInput("");
    showHidesnackbar("تمت الاضافه بنجاح");
  }
  // handel delet ***************
  function handelelopenDeletDialog(todo) {
    setdialogtodo(todo);
    setshowdeletdialog(true);
  }
  function handelclosdeletedialog() {
    setshowdeletdialog(false);
  }
  function handeldeleteElement() {
    dispatch({ type: "delete", payload: dialogtodo });
    setshowdeletdialog(false);

    showHidesnackbar("نم الحذف بنجاح");
  }
  // handel edit ************
  function handeleshoweditdialog(todo) {
    setdialogtodo(todo);

    setshoweditdialog(true);
  }
  function handelcloseditdialog() {
    setshoweditdialog(false);
  }
  function handeledit() {
    dispatch({ type: "uppdated", payload: dialogtodo });
    setshoweditdialog(false);
    showHidesnackbar("تم التعديل بنجاح");
  }

  const todosJsx = displayTodos.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        opendeletdialog={handelelopenDeletDialog}
        openeditdialog={handeleshoweditdialog}
      />
    );
  });

  return (
    <>
      {/* delet dialog */}
      <Dialog
        open={showdeleltdialog}
        onClose={handelclosdeletedialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          هل انت متاكد من الحذف؟{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="responsive-dialog-title">
            في حالة التاكيد لايمكنك التراجع.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelclosdeletedialog}>اغلاق</Button>
          <Button autoFocus onClick={handeldeleteElement}>
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* //////////////delet dialog/////////////// */}

      {/* edit dialog */}
      <Dialog
        open={showeditdialog}
        onClose={handelcloseditdialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="responsive-dialog-title"
            label="العنوان "
            fullWidth
            variant="standard"
            value={dialogtodo.title}
            onChange={(e) => {
              setdialogtodo({ ...dialogtodo, title: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            id="responsive-dialog-title"
            label="الموضوع "
            fullWidth
            variant="standard"
            value={dialogtodo.detailes}
            onChange={(e) => {
              setdialogtodo({ ...dialogtodo, detailes: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelcloseditdialog}>اغلاق</Button>
          <Button onClick={handeledit}>تعديل</Button>
        </DialogActions>
      </Dialog>
      {/* //////////////edit dialog/////////// */}

      <Container
        sx={{ minWidth: 500 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          height: "100vh",
          width: "100vs",
          direction: "rtl",
        }}
      >
        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            <Typography variant="h2">مهامي</Typography>
            <Divider />

            <div style={{ marginTop: 8 }}>
              <ToggleButtonGroup
                color="primary"
                value={displayTodosType}
                exclusive
                onChange={uppdatedisplayTodos}
                aria-label="Platform"
                style={{ direction: "ltr" }}
              >
                <ToggleButton value="noncompleted">الغير منجز</ToggleButton>
                <ToggleButton value="completed">المنجز</ToggleButton>
                <ToggleButton value="all">الكل</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Grid container spacing={2} style={{ marginTop: "5px" }}>
              <Grid xs={7}>
                {" "}
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمه"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => {
                    settitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={5}>
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    hndelAddCLick();
                  }}
                  disabled={titleInput.length == 0}
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
            {todosJsx}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
