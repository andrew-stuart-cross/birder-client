module.exports = (req, res, next) => {

    if (req.method === 'POST' && req.originalUrl === '/authentication/login') { // /authToken') {
        return res.jsonp({
            "authenticationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFuZHJldyIsIkltYWdlVXJsIjoiaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9jb2xvci85Ni8wMDAwMDAvdXNlci5wbmciLCJMYXQiOiI1My40NDI1OTM0IiwiTG5nIjoiLTIuMjc2OTA1MiIsIkZsaWNrcktleSI6IjAzMzM4ZTJjOThiNTA3YWFmOWZiZDBmOGYwNDU1ODFiIiwianRpIjoiZjYzOTdiMjUtODdhNC00NTI4LTk1YTctMjMzY2FiMTI4Zjg5IiwiZXhwIjoxNzA5MzE3NDA3LCJpc3MiOiJodHRwczovL2JpcmRlcndlYi5jb20iLCJhdWQiOiJodHRwczovL2JpcmRlcndlYi5jb20ifQ.XEZ-zzPC-nJjC4JqFRuBjBaa0iwYbmwpx4ecVIHorgk",
            "failureReason": "0"
        })
    }

    // Observation Analysis api
    if (req.method === 'GET' && req.originalUrl === '/observationanalysis') {
        return res.jsonp(
            {
                totalObservationsCount: Math.floor(Math.random() * 100) + 1,
                uniqueSpeciesCount: Math.floor(Math.random() * 40) + 1
            });
    }

    // observation api

    if (req.method === 'GET' && req.originalUrl === '/observation') {

        return res.jsonp(
            {
                observationId: 10094,
                quantity: 1,
                observationDateTime: new Date(),
                creationDate: new Date(),
                lastUpdateDate: new Date(),
                birdId: 1005,
                bird: {
                    birdId: 1005,
                    species: "Puffinus mauretanicus",
                    englishName: "Balearic Shearwater",
                    populationSize: "1,000 - 10,000 Birds",
                    btoStatusInBritain: "Passage Visitor",
                    thumbnailUrl: null,
                    conservationStatus: "Red",
                    conservationListColourCode: "Red",
                    birderStatus: 0
                },
                "position": {
                    observationPositionId: 78,
                    latitude: 53.44244782183897,
                    longitude: -2.2773529647976964,
                    formattedAddress: "581A Wilbraham Rd, Chorlton-cum-Hardy, Manchester M21 9AF, UK",
                    shortAddress: "Manchester, United Kingdom"
                },
                "user": {
                    userName: "monkey",
                    avatar: "https://img.icons8.com/color/96/000000/user.png",
                    defaultLocationLatitude: 53.44244782183897,
                    defaultLocationLongitude: -2.2773529647976964
                },
                "notes": [
                    {
                        id: 24,
                        noteType: "General",
                        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    },
                    {
                        id: 25,
                        noteType: "General",
                        note: "yu"
                    }
                ]
            }
        )
    }


    if (req.method === 'POST' && req.originalUrl === '/createobservation') {
        return res.jsonp({
            observationId: 10094, // an object with this id exists in 'observations'
            quantity: req.body.quantity,
            observationDateTime: req.body.observationDateTime,
            creationDate: new Date(),
            lastUpdateDate: new Date(),
            birdId: req.body.bird.birdId,
            bird: req.body.bird,
            user: {
                userName: 'Andrew',
                avatar: 'https://img.icons8.com/color/96/000000/user.png',
                defaultLocationLatitude: 54.972237,
                defaultLocationLongitude: -2.4608560000000352
            },
            position: req.body.position,
            notes: req.body.notes
        })
    }

    if (req.method === 'DELETE' && req.originalUrl === '/deleteobservation') {
        return res.jsonp({
            id: 1
        })
    }

    if (req.method === 'PUT' && req.originalUrl === '/updateobservation') {
        return res.jsonp({
            observationId: req.body.observationId, // an object with this id 10090 exists in 'observations'
            quantity: req.body.quantity,
            observationDateTime: req.body.observationDateTime,
            creationDate: req.body.creationDate,
            lastUpdateDate: new Date(),
            birdId: req.body.bird.birdId,
            bird: req.body.bird,
            user: req.body.user,
            position: req.body.position,
            notes: req.body.notes
        })
    }

    if (req.method === 'POST' && req.originalUrl === '/account/register') {
        return res.jsonp({
            success: true
        })
    }

    if (req.method === 'POST' && req.originalUrl === '/account/resend-email-confirmation') {
        return res.jsonp({ success: true })
    }

    if (req.method === 'POST' && req.originalUrl === '/account/request-password-reset') {
        return res.jsonp({ success: true })
    }

    if (req.method === 'POST' && req.originalUrl === '/account/reset-password') {
        return res.jsonp({ success: true })
    }

    if (req.method === 'POST' && req.originalUrl === '/account/check-username') {
        return res.jsonp({ usernameTaken: false })
    }

    if (req.method === 'POST' && req.originalUrl === '/account/check-email') {
        return res.jsonp({ emailTaken: false })
    }

    // Manage

    if (req.method === 'GET' && req.originalUrl === '/manage') {
        return res.jsonp({
            userName: "Andrew",
            isEmailConfirmed: false,
            email: "andrew.cross11@gmail.com"
        })
    }

    if (req.method === 'POST' && req.originalUrl === '/manage/profile') {
        return res.jsonp({
            isEmailConfirmationRequired: true
        })
    }

    if (req.method === 'POST' && req.originalUrl === '/manage/location') {
        return res.jsonp({
            defaultLocationLatitude: req.body.defaultLocationLatitude,
            defaultLocationLongitude: req.body.defaultLocationLongitude
        })
    }

    if (req.method === 'POST' && req.originalUrl === '/manage/password') {
        return res.jsonp({ success: true })
    }

    // *************************************
    // Network api

    if (req.method === 'GET' && req.originalUrl === '/network') {

        return res.jsonp(
            {
                followersCount: Math.floor(Math.random() * 69) + 1,
                followingCount: Math.floor(Math.random() * 43) + 1
            });
    }

    // follow
    if (req.method === 'POST' && req.originalUrl === '/follow') {
        return res.jsonp({
            userName: req.body.userName,
            avatar: req.body.avatar,
            isFollowing: true,
            isOwnProfile: req.body.isOwnProfile
        })
    }

    // unfollow
    if (req.method === 'POST' && req.originalUrl === '/unfollow') {
        return res.jsonp({
            userName: req.body.userName,
            avatar: req.body.avatar,
            isFollowing: false,
            isOwnProfile: req.body.isOwnProfile
        })
    }


    // followers
    if (req.method === 'GET' && req.originalUrl === '/network/followers') {

        const randomInt = Math.floor(Math.random() * 10) + 1;
        const data = { followers: [] }

        for (let i = 0; i < randomInt; i++) {
            data.followers.push({
                userName: `follower ${i + 1}`,
                avatar: 'https://img.icons8.com/color/96/000000/user.png',
                isFollowing: true,
                isOwnProfile: false
            })
        }

        return res.jsonp(data.followers);
    }

    // following
    if (req.method === 'GET' && req.originalUrl === '/network/following') {

        const randomInt = Math.floor(Math.random() * 10) + 1;
        const data = { following: [] }

        for (let i = 0; i < randomInt; i++) {
            data.following.push({
                userName: `follower ${i + 1}`,
                avatar: 'https://img.icons8.com/color/96/000000/user.png',
                isFollowing: true,
                isOwnProfile: false
            })
        }

        return res.jsonp(data.following);
    }

    // Tweet api

    // tweetDay
    if (req.method === 'GET' && req.originalUrl === '/tweets') {

        return res.jsonp(
            {
                tweetDayId: 1,
                songUrl: "https://www.xeno-canto.org/sounds/uploaded/BPSDQEOJWG/XC448690--Tofsvipa-varningsl%C3%A4te-Eneb%C3%A5gsudden%2C%20Brevik%20Vg-%282017-05-01%2012.05%29-LS140667.mp3",
                displayDay: "2021-02-18T00:00:00Z",
                creationDate: "2020-11-27T22:30:26.5866667Z",
                lastUpdateDate: "2021-01-29T14:32:24.91Z",
                birdId: "1113",
                species: "Vanellus vanellus",
                englishName: "Lapwing"
            });
    }

    // tweet archive
    if (req.method === 'GET' && req.originalUrl === '/tweetArchive') {

        const randomInt = Math.floor(Math.random() * 10) + 1;
        const data = [];

        for (let i = 0; i < randomInt; i++) {
            data.push({
                tweetDayId: i,
                songUrl: "https://www.xeno-canto.org/sounds/uploaded/BPSDQEOJWG/XC448690--Tofsvipa-varningsl%C3%A4te-Eneb%C3%A5gsudden%2C%20Brevik%20Vg-%282017-05-01%2012.05%29-LS140667.mp3",
                displayDay: "2021-02-18T00:00:00Z",
                creationDate: "2020-11-27T22:30:26.5866667Z",
                lastUpdateDate: "2021-01-29T14:32:24.91Z",
                birdId: "1113",
                species: "Vanellus vanellus",
                englishName: "Lapwing"
            });
        }

        return res.jsonp(data);
    }

    // user profile
    if (req.method === 'GET' && req.originalUrl === '/userprofile') {

        return res.jsonp(
            {
                user: {
                    userName: "monkey",
                    avatar: "https://img.icons8.com/color/96/000000/user.png",
                    isFollowing: false,
                    isOwnProfile: true
                },
                registrationDate: "2021-06-14T23:26:54.1974072Z",
                observationCount: {
                    totalObservationsCount: Math.floor(Math.random() * 100) + 1,
                    uniqueSpeciesCount: Math.floor(Math.random() * 55) + 1,
                },
                followersCount: Math.floor(Math.random() * 50) + 1,
                followingCount: Math.floor(Math.random() * 60) + 1,
            });
    }

    // Generate random data...
    // Using JS instead of a JSON file, you can create data programmatically.

    //     const data = { users: [] }
    //     // Create 1000 users
    //     for (let i = 0; i < 1000; i++) {
    //       data.users.push({ id: i, name: `user${i}` })
    //     }
    //     return data
    //   }


    next()
}