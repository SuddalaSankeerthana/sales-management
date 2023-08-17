function getStyles() {
  return `
      .text-bold-black{color: black;  font-weight: bold;}
      .text-gray-right{
      color:gray;
      text-align: left;
      }
      .text-black{
      width:10%;
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
    }
    .Padd-left{
      text-align: left;
    }
    table, td {
     width: fit-content;
     justify-content:center;
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

module.exports = getStyles;
