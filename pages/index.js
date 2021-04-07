import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { format } from 'date-fns';
import EnhancedTable from '../src/ui/EnhancedTable';

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  button: {
    color: '#fff',
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search,
  };
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();
  const [rows, setRows] = useState([
    createData(
      'Zachary Reece',
      '11/2/19',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500',
      true
    ),
    createData(
      'Bill Gates',
      '10/17/19',
      'Custom Software',
      'GPS, Push Notifications, Users/Authentication, File Transfer',
      'Medium',
      'Web Application',
      '0-10',
      '$1600',
      true
    ),
    createData(
      'Steve Jobs',
      '2/13/19',
      'Custom Software',
      'Photo/Video, File Transfer, Users/Authentication',
      'Low',
      'Web Application',
      '10-100',
      '$1250',
      true
    ),
    createData(
      'Stan Smith',
      '2/13/19',
      'Mobile App',
      'Photo/Video, File Transfer, Users/Authentication',
      'Low',
      'iOS, Android',
      '10-100',
      '$1250',
      true
    ),
    createData(
      'Albert Einstein',
      '2/13/19',
      'Mobile App',
      'Photo/Video, File Transfer, Users/Authentication',
      'Low',
      'Android',
      '10-100',
      '$1250',
      true
    ),
  ]);

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);

  const platformOptions = ['Web', 'iOS', 'Android'];
  var featureOptions = [
    'Photo/Video',
    'GPS',
    'File Transfer',
    'Users/Authentication',
    'Biometrics',
    'Push Notifications',
  ];
  var websiteOptions = ['Basic', 'Interactive', 'E-Commerce'];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState('');
  const [service, setService] = useState('');
  const [complexity, setComplexity] = useState('');
  const [users, setUsers] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = React.useState(0);

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, 'MM/dd/yy'),
        service,
        features.join('', ''),
        service === 'Website' ? 'N/A' : complexity,
        service === 'Website' ? 'N/A' : platforms.join('', ''),
        service === 'Website' ? 'N/A' : users,
        `$${total}`,
        true
      ),
    ]);
    setDialogOpen(false);
    setName('');
    setDate(new Date());
    setTotal('');
    setService('');
    setComplexity('');
    setUsers('');
    setPlatforms([]);
    setFeatures([]);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );

    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];

    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction='column'>
        <Grid item style={{ marginTop: '2em', marginLeft: '5em' }}>
          <Typography variant='h1'>Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder='Search project details or create a new entry.'
            value={search}
            onChange={handleSearch}
            style={{ width: '35em', marginLeft: '5em', paddingBottom: '3em' }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                  onClick={() => setDialogOpen(true)}
                >
                  <AddIcon color='primary' style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item style={{ marginLeft: '5em', marginTop: '2em' }}>
          <FormGroup row>
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={websiteChecked}
                  color='primary'
                  onChange={() => setWebsiteChecked(!websiteChecked)}
                />
              }
              label='Websites'
              labelPlacement='start'
            />
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={iOSChecked}
                  color='primary'
                  onChange={() => setiOSChecked(!iOSChecked)}
                />
              }
              label='iOS Apps'
              labelPlacement='start'
            />
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={androidChecked}
                  color='primary'
                  onChange={() => setAndroidChecked(!androidChecked)}
                />
              }
              label='Android Apps'
              labelPlacement='start'
            />
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={softwareChecked}
                  color='primary'
                  onChange={() => setSoftwareChecked(!softwareChecked)}
                />
              }
              label='Custom Software'
              labelPlacement='start'
            />
          </FormGroup>
        </Grid>
        <Grid item style={{ marginTop: '5em', marginBottom: '35em' }}>
          <EnhancedTable
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>
        <Dialog
          fullWidth
          maxWidth='md'
          open={dialogOpen}
          style={{ zIndex: 1302 }}
          onClose={() => setDialogOpen(false)}
        >
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='h1' gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justify='space-between'>
              <Grid item>
                <Grid item container direction='column' sm>
                  <Grid item>
                    <TextField
                      id='name'
                      label='Name'
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction='column'
                    style={{ marginTop: '5em' }}
                  >
                    <Grid item>
                      <Typography variant='h4'>Service</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label='service'
                        name='service'
                        value={service}
                        onChange={(event) => {
                          setService(event.target.value);
                          setFeatures([]);
                        }}
                      >
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value='Website'
                          label='Website'
                          control={<Radio />}
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value='Mobile App'
                          label='Mobile App'
                          control={<Radio />}
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value='Custom Software'
                          label='Custom Software'
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </Grid>
                    <Grid item style={{ marginTop: '5em' }}>
                      <Select
                        labelId='platforms'
                        id='platforms'
                        disabled={service === 'Website'}
                        MenuProps={{ style: { zIndex: 1302 } }}
                        multiple
                        style={{ width: '12em' }}
                        displayEmpty
                        renderValue={
                          platforms.length > 0 ? undefined : () => 'Platforms'
                        }
                        value={platforms}
                        onChange={(event) => setPlatforms(event.target.value)}
                      >
                        {platformOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction='column'
                  sm
                  alignItems='center'
                  style={{ marginTop: 16 }}
                >
                  <Grid item>
                    <KeyboardDatePicker
                      DialogProps={{ style: { zIndex: 1302 } }}
                      format='MM/dd/yyyy'
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction='column'
                      style={{ marginTop: '5em' }}
                    >
                      <Grid item>
                        <Typography variant='h4'>Complexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label='complexity'
                          name='complexity'
                          value={complexity}
                          onChange={(event) =>
                            setComplexity(event.target.value)
                          }
                        >
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{ label: classes.service }}
                            value='Low'
                            label='Low'
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{ label: classes.service }}
                            value='Medium'
                            label='Medium'
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{ label: classes.service }}
                            value='High'
                            label='High'
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction='column' sm>
                  <Grid item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>$</InputAdornment>
                        ),
                      }}
                      id='total'
                      label='Total'
                      value={total}
                      onChange={(event) => setTotal(event.target.value)}
                    />
                  </Grid>
                  <Grid item style={{ alignSelf: 'flex-end' }}>
                    <Grid
                      item
                      container
                      direction='column'
                      style={{ marginTop: '5em' }}
                    >
                      <Grid item>
                        <Typography variant='h4'>Users</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label='users'
                          name='users'
                          value={users}
                          onChange={(event) => setUsers(event.target.value)}
                        >
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value='0-10'
                            label='0-10'
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value='10-100'
                            label='10-100'
                            control={<Radio />}
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value='100+'
                            label='100+'
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: '5em' }}>
                    <Select
                      labelId='features'
                      MenuProps={{ style: { zIndex: 1302 } }}
                      id='features'
                      multiple
                      style={{ width: '12em' }}
                      displayEmpty
                      renderValue={
                        features.length > 0 ? undefined : () => 'Features'
                      }
                      value={features}
                      onChange={(event) => setFeatures(event.target.value)}
                    >
                      {service === 'Website'
                        ? (featureOptions = websiteOptions)
                        : null}
                      {featureOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify='center' style={{ marginTop: '3em' }}>
              <Grid item>
                <Button
                  color='primary'
                  style={{ fontWeight: 300 }}
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  className={classes.button}
                  onClick={addProject}
                  disabled={
                    service === 'Website'
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length == 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item container>
        <Grid item></Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

//   createData(
//     'Bob Glover',
//     '2/19/2021',
//     'Website',
//     'E-Commerce',
//     'N/A',
//     'N/A',
//     'N/A',
//     '$10,500',
//     true
//   ),
//   createData(
//     'Stan Smith',
//     '2/13/19',
//     'Mobile App',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'iOS, Android',
//     '10-100',
//     '$1250',
//     true
//   ),
//   createData(
//     'Bill Atkinson',
//     '10/17/19',
//     'Custom Software',
//     'GPS, Push Notifications, Users/authenticaiton, File Transfer',
//     'Medium',
//     'Web Application',
//     '0-10',
//     '$8,600',
//     true
//   ),
//   createData(
//     'Steve Metessen',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Dave Jennings',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Karl Timmons',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Jim Crawford',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Phillip Torensen',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Craig Davis',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'John Bennings',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Rand Johnson',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Ed Thompson',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Yvette Traynor',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Gene Cummings',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Les Veneer',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Gail Overton',
//     '2/13/19',
//     'Custom Software',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Web Application',
//     '10-100',
//     '$3,500',
//     true
//   ),
//   createData(
//     'Albert Einstein',
//     '2/13/19',
//     'Mobile App',
//     'Photo/Video, File Transfer, Users/Authentication',
//     'Low',
//     'Android',
//     '10-100',
//     '$1250',
//     true
//   ),
// ]);
