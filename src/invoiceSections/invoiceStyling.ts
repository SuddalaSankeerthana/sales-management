export function getStyles():string{
  return `
    .text-gray-right{
    color:gray;
    }
    .text-black{
    color:black;
    font-weight: bold;
    }
    .Section-1{
    border-top: 1px solid;
    border-bottom: 1px solid;
    }
    .Section-2{
    text-align: left;
    justify-content: left;
    border-top: 1px dotted;
    }
    .Padd-left{
    text-align: left;
    }
    table, td {
    width: fit-content;
    justify-content:center;
    border: 1px dotted;
    border-collapse:collapse;
    }
    body{
    display: flex;
    width: fit-content;
    align-items: right;
    justify-content: center;
    flex-direction: column;
    font-family:monospace;
    border: solid;
    }
    h3{
    text-align: center;
    }
    `;
}
