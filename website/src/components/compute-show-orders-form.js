import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import DancersListDialog from './dancers-list-dialog';
import DanceListDialog from './dance-orders-list';
import { findShowOrder } from '../data-utils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

const ComputeShowOrdersForm = ({danceInfo}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    numIterations: "1,000,000",
    frozenDances: [],
  });

  const [danceOrderMatrix, setDanceOrderMatrix] = React.useState({
    options: [],
    totals: []
  });

  const [open, setOpen] = React.useState(false);
  const [danceConfigOpen, setDanceConfigOpen] = React.useState(false);

  const handleShowDancers = () => setOpen(true);
  const handleHideDancers = () => setOpen(false);
  const handleShowDanceConfig = () => setDanceConfigOpen(true);
  const handleHideDanceConfig = () => setDanceConfigOpen(false);
  const handleComputeShowOrders = () => {
    const seedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const frozens = state.frozenDances.map(({dance, ind}) => {
      const danceId = danceInfo.danceNames.indexOf(dance)
      return [ind, danceId];
    })
    const promises = seedArray.map((_junk) => findShowOrder({
      datamatrix: danceInfo.matrix,
      frozenDances: frozens,
      numIters: 500000
    }));
    Promise.all(promises).then(allPromises => {
        const promiseArr = allPromises.sort((a, b) => a.minCollisions - b.minCollisions).slice(0, 5);
        const totals = promiseArr.map(p => p.minCollisions);
        const rowArr = promiseArr[0].order.map((_, i) => []);
        const ret = []
        for (let rI = 0; rI < rowArr.length; rI++) {
          const rowValues = promiseArr.map(a => danceInfo.danceNames[a.order[rI]]);
          ret.push(rowValues);
        }
        console.log(ret)
        const orders = promiseArr.map(p => p.order);
        setDanceOrderMatrix({options: ret, totals: totals});
    });
  };

  const setLocks = b => {
    setState({...state, frozenDances: b});
  }
  if (danceInfo) {
    return <Grid container spacing={3}>
    <Grid item xs={6}>
      <Paper className={classes.paper}>
    <h2>Found {danceInfo.uniqueDancers.length} Dancers</h2>
        <p>
          Click the button below to see all the unique dancer names. If any dancer's name is present twice,
          check the uploaded csv for typos or extra spaces, etc.
        </p>
        <Button variant="outlined" onClick={handleShowDancers}>
          See Found Dancers
        </Button>
        <DancersListDialog dancers={danceInfo.uniqueDancers} open={open} onClose={handleHideDancers} />
      </Paper>
    </Grid>
    <Grid item xs={6}>
    <Paper className={classes.paper}>
      <h2>
        Configure any show order requirements.
      </h2>
      <p>
        Here is the list of dances we discovered from the uploaded file.
        If any dance <b>Must</b> happen somewhere in the show order, drag its
        listing to that location and check the box to lock it in place. This will
        forbid the system from moving that dance to a different place in the show order.
        <br></br> <br></br>
        Note that you must lock the intermission to wherever you want it to go as well!
      </p>
      <Button variant="outlined" onClick={handleShowDanceConfig}>
          Configure Dances
        </Button>
      <DanceListDialog open={danceConfigOpen} danceNames={danceInfo.danceNames} callback={setLocks} onClose={handleHideDanceConfig}/>
    </Paper>
    </Grid>
    <Grid item xs={12}>
      <Paper>
        <p>
        When you're finished configuring any locked dances, press the "submit" button
        below and the tool will try 10 million show orders and present the 5 best it found with
        the fewest quick changes.
        <br></br> <br></br>
        If none of them look good, just submit again and 5 more options will be generated.
        </p>
        <Button variant="outlined" onClick={handleComputeShowOrders}>Compute Show Orders</Button>
        {danceOrderMatrix ? 
              <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {danceOrderMatrix.totals.map((e, i) =>            
        <TableCell>Option {i + 1} ({e} Collisions)</TableCell>
                    )}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  danceOrderMatrix.options.map((row, i) =>
                    <TableRow key={i}>
                      {
                        row.map((c) => 
                          <TableCell component="th" scope="row">
                            {c}
                          </TableCell>
                        )
                      }
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
        : ""}
      </Paper>
    </Grid>
  </Grid>;
  }
  return <div></div>
};

export default ComputeShowOrdersForm;