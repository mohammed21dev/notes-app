import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Fade,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningIcon from "@mui/icons-material/Warning";

import MainLayout from "../../layouts/MainLayout";
import NoteForm from "./NoteForm";
import { formatDate } from "../../utils/dateUtils";
import { getNoteById, updateNote, deleteNote } from "../../utils/noteUtils";

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundNote = getNoteById(id);
      setNote(foundNote);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  const handleUpdate = (updatedNote) => {
    const updated = updateNote(id, updatedNote);
    if (updated) {
      setNote(updated);
    }
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    const success = deleteNote(id);
    if (success) {
      navigate("/");
    }
    setDeleteDialogOpen(false);
  };

  if (!note && !loading) {
    return (
      <MainLayout>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" color="error" gutterBottom>
            Note not found
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2 }}
          >
            Back to Notes
          </Button>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={loading ? "Loading..." : note.title}>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 4 }}
        >
          Back to Notes
        </Button>

        <Fade in={!loading}>
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 3,
              backgroundColor: "background.paper",
            }}
          >
            {loading ? (
              <>
                <Skeleton
                  variant="text"
                  height={60}
                  width="80%"
                  sx={{ mb: 1 }}
                />
                <Skeleton variant="text" width="40%" sx={{ mb: 3 }} />
                <Skeleton variant="rectangular" height={200} sx={{ mb: 3 }} />
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
                  >
                    {note.title}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      color="primary"
                      onClick={() => setEditModalOpen(true)}
                      sx={{
                        bgcolor: "primary.light",
                        color: "white",
                        "&:hover": { bgcolor: "primary.main" },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setDeleteDialogOpen(true)}
                      sx={{
                        bgcolor: "error.light",
                        color: "white",
                        "&:hover": { bgcolor: "error.main" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Chip
                  label={formatDate(note.createdTime)}
                  size="small"
                  sx={{
                    mb: 3,
                    bgcolor: "rgba(99, 102, 241, 0.1)",
                    color: "primary.dark",
                    fontWeight: 500,
                  }}
                />

                <Divider sx={{ mb: 3 }} />

                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.8,
                    color: "text.primary",
                    fontSize: "1.1rem",
                  }}
                >
                  {note.content}
                </Typography>
              </>
            )}
          </Paper>
        </Fade>
      </Box>

      <NoteForm
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        note={note}
        onSubmit={handleUpdate}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon color="error" />
          <Typography variant="h6" component="span">
            Delete Note
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete "{note?.title}"? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}
