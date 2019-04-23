let semaines = [];
for (let i = 0; i < 50; i++) {
  semaines.push(i);
}



let columns = [{ title: "Dev" }]
for (let i = 1; i < semaines.length; i++) {
  columns.push({ title: `Week ${i}` })
}
// console.log('colonne', columns); ok ca marche 






document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');


  Promise.all([axios.get('/api/users'), axios.get('/api/dashboard')])

    .then(([user, cal]) => {
      // var dataSet = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
      // ];
      var dataSet = [];
      let users = user.data.map(e => e.username)
      console.log('array users', users)


      for (let index = 0; index < users.length - 1; index++) {

        //ajoute le nom du USER en debut de l'array 
        dataSet.push([`${users[index]}`])

        // on filtre tout le travail pour un USER 
        let oneUser = cal.data.calendar.filter(e => e.user.username === users[index])
        console.log('test de la loop pour ' + users[index])
        console.log(oneUser)

        // Loop pour chaque week ajouter un string à DATASET [USER][0, .... -> 50]
        for (let i = 1; i < 51; i++) {

          let oneweek = oneUser.filter(e => e.week === i)

          let times = 0
          if (oneweek.length > 0) {
            oneweek.forEach(e => times += e.time)
            console.log('times ', times)
          }
          dataSet[index][i] = times.toFixed(2)

        }

      }

      console.log(dataSet);








      $('#example').DataTable({
        data: dataSet,
        columns: columns,
      })

    })




}, false);
