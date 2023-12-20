let p  = fetch("https://api.openweathermap.org/data/2.5/weather?q=Pakistan&appid=83b52945198b47d930bdf60f5d3b0682")
p.then((a)=>{
    console.log(a.status)
    console.log(a.ok)
    return a.json()
    // return a.text()
}).then((a)=>{
    console.log(a)
})