#some debug calls

##Reset all watchedAt values
```
CRUD.Find('Episode', {}, {'limit': 100000}).then(function(elements) {
    elements.map(function(el) {
        el.set('watched', 0);
        el.set('watchedAt', null);
        el.Persist().then(
            function() {
                console.log('saved!');
        })
    })
})
```

##Clear all series and episodes (empty database)

```
CRUD.Find('Episode', {}, {'limit': 100000}).then(function(elements) {
    elements.map(function(el) {
        el.Delete().then(
            function() {
                console.log('Deleted Episode!');
        })
    })
});

CRUD.Find('Serie', {}, {'limit': 10000}).then(function(elements) {
    elements.map(function(el) {
        el.Delete().then(
            function() {
                console.log('Deleted Serie!') ;
        })
    })
});

CRUD.Find('Season', {}, {'limit': 10000}).then(function(elements) {
    elements.map(function(el) {
        el.Delete().then(
            function() {
                console.log('Deleted Season!') ;
        })
    })
});
```

##Clear episodes that were not properly deleted due to too narrow limit clause in favoritesservice.remove function
```
var serieIds = [];

CRUD.EntityManager.getAdapter().db.execute('select distinct(ID_Serie) from Series').then(function(res) {
    while(r = res.next()) {
        serieIds.push(r.row.ID_Serie)
    }

    CRUD.EntityManager.getAdapter().db.execute('delete from Episodes where ID_Serie not in ('+serieIds.join(',')+') ').then(function(res) {
        console.log('done!', res.rs.rowsAffected, 'items deleted!')
    });

});
```

##Completely nuke the database, settings and timers

```
CRUD.EntityManager.getAdapter().db.execute('drop table Episodes');
CRUD.EntityManager.getAdapter().db.execute('drop table EventSchedule');
CRUD.EntityManager.getAdapter().db.execute('drop table Series');
CRUD.EntityManager.getAdapter().db.execute('drop table Seasons');
CRUD.EntityManager.getAdapter().db.execute('drop table WatchList');
CRUD.EntityManager.getAdapter().db.execute('drop table WatchListObject');
localStorage.clear();
if(('chrome' in window) && ('alarms' in window.chrome)) {
    chrome.alarms.clearAll();
}
```
