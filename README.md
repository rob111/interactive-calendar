[ ![Codeship Status for rob111/interactive-calendar](https://app.codeship.com/projects/06dc11d0-caa8-0136-81ea-26b78825a9b6/status?branch=master)](https://app.codeship.com/projects/315240)

Interactive online organizer built with React.js and Redux and backend Express.js, mongoose and MongoDB. Here is live version.
This project is still under construction. This is my first where I combine React, Redux, Express and MongoDB.
Besides of all technologies I listed above I used some material-ui React library.

This webapp copies main functionality of google calendar. User can add, save, resize and delete events.

Below instructions how to deploy:

Before run the project you have to have or installed node.js version 11.0.0 or later, MongoDB 3.2 or later and yarn v1.10 or later on your computer.
After you clone or download a project in your directory navigate to its directory. You have to run `yarn install` in `/interactive-calendar` directory.
Then navigate to `interactive-calendar/backend` and run `yarn install` again. And the last place where you have to run `yarn install` is `/interactive-calendar/client` directory.
To run a project return to `/interactive-calendar` directory and run `yarn start`. Open browser and type `localhost:3000`.

For now I am running database on my local machine.
I am planning host it in the cloud. In that case you have to change `dbRoute` in `/interactive-calendar/backend/index.js`.
