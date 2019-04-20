$(document).ready( function () {
  axios.get('/api/dashboard')
  .then(response => {
    console.log(response.data)
    let data = Object.values(response.data.cal)
    data = data.map(row => {
      console.log('ok', row)
    })
  })
    $('#myTable').DataTable();
} );