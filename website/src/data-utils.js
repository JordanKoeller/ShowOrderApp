

const url = "https://9tylb3mwgj.execute-api.us-east-1.amazonaws.com/Prod/index";

export const findShowOrder = async ({datamatrix, frozenDances, numIters}) => {
  const body = {
    collisions: datamatrix,
    frozen: frozenDances ? frozenDances : [[]],
    iterCount: numIters
  };
  console.log(JSON.stringify(body));
  const request = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'text/plain',
    }
  });
  // console.log(await request.text())
  const responseBody = await request.json();
  console.log(responseBody)
  return responseBody;
};

