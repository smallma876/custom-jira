import { ChangeEvent, FC, useMemo, useState, useContext } from "react";
import { GetServerSideProps } from "next";

import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { EntriesContext } from "../../context/entries";
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { dateFunctions } from "../../utils";
import { Router, useRouter } from "next/router";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

export const EntryPage: FC = () => {
  const { query, push } = useRouter();
  const { entries, updateEntry } = useContext(EntriesContext);
  const [entry, setEntry] = useState(
    entries.find((entry) => entry._id === query.id)
  );
  const [inputValue, setInputValue] = useState(entry?.description);
  const [status, setStatus] = useState<EntryStatus>(
    entry?.status as EntryStatus
  );
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => !inputValue || (inputValue.length <= 0 && touched),
    [inputValue, touched]
  );

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (!inputValue || inputValue?.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry!,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
  };

  return (
    <Layout title={inputValue?.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                entry?.createdAt || 0
              )}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                defaultValue={entry?.description}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChanged}
                helperText={isNotValid && "Ingrese un valor"}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}
                  defaultValue={entry?.status}
                >
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={!inputValue || inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "primary.dark",
        }}
        onClick={() => push("/")}
      >
        <ReplyOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

export default EntryPage;
