// mise en place de la strtucture , on crée une array avec 52 semaines 
// let semaines = [];
// for (let i = 0; i < 52; i++) {
//   semaines.push(i);
// }

// // on crée les colonnes du tableaux 
// let columns_Name = [{ title: "Dev" }]
// for (let i = 1; i < semaines.length; i++) {
//   columns.push({ title: `Week ${i}` })
// }
// console.log('colonne', columns); ok ca marche 










// promise de tout recupérer 
Promise.all([axios.get('/api/users'), axios.get('/api/dashboard')])

  .then(([user, cal]) => {
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
      for (let i = 1; i < 53; i++) {

        let oneweek = oneUser.filter(e => e.week === i)

        let times = 0
        if (oneweek.length > 0) {
          oneweek.forEach(e => times += e.time)
          console.log('times ', times)
        }
        dataSet[index][i] = times.toFixed(2) + ' H'
      }

    }

    console.log(dataSet);
    $('#dash1').DataTable({
      data: dataSet,
      columns: columns_Name,
    })

  })





module.exports = dash1 