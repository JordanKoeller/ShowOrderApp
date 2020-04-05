const computeCollisions = csv => {
  const data = csv.data;
  const headers = data[0];
  const dancerLists = headers.map(e => []);
  const matrix = headers.map(e => headers.map(f => 0));
  // Parse out csv.
  for (let rowI=1; rowI < data.length; rowI++) {
    const row = data[rowI];
    for (let colI=0; colI < row.length; colI++) {
      dancerLists[colI] = dancerLists[colI].concat([row[colI]]);
    }
  }

  // Populate the collision matrix
  for (let i=0; i < headers.length; i++) {
    for (let j=0; j < headers.length; j++) {
      if (i !== j) {
        const dancersA = dancerLists[i];
        const dancersB = dancerLists[j];
        let counter = 0;
        dancersA.forEach(dancerName => {
          if (dancerName !== "" && dancersB.includes(dancerName)) {
            counter++;
          }
        });
        matrix[i][j] = counter;
      }
    }
  }
  // Populate a list of all the unique dancers the system found.
  const dancerNames= [];
  data.slice(1).forEach(dancers =>
    dancers.forEach(dancer =>
      dancerNames.includes(dancer) && dancerNames !== "" ? "" : dancerNames.push(dancer)));
  dancerNames.sort()
  const ret = {matrix: matrix,
    dancersLists: dancerLists,
    danceNames: headers,
    uniqueDancers: dancerNames};
  return addIntermission(ret);
  // return ret;
};

export const addIntermission = ({matrix, dancersLists, danceNames, uniqueDancers}) => {
  const emptRow = matrix.map(e => 0);
  matrix.push(emptRow);
  matrix.forEach(e => e.push(0));
  danceNames.push("INTERMISSION");
  // console.log(m2);
  // console.log(dNames)
  return {
    matrix: matrix,
    dancersLists: dancersLists,
    danceNames: danceNames,
    uniqueDancers: uniqueDancers
  };
}

export default computeCollisions;