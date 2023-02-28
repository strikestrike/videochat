# Video Chat App ✨

This video chat app is a Progressive Web App (PWA) that allows users to connect with each other through video chat. The app is built using React, WebRTC, Socket.io, Node.js, and MongoDB.
The app consists of two main screens - the Welcome Screen and the Welcome Back Screen. The Welcome Screen is displayed when a new user opens the app, and the Welcome Back Screen is displayed when a user is in cache or when a login link is opened.
The middle area displays the video stream, and includes a round indicator that shows the progress of the current round. The bottom area displays the user's contacts, which are ordered by relevance and can be marked as liked or starred.
The backend of the app includes a round logic system, which matches users based on their likes and availability. If a user joins during a round, they are matched with someone who speaks the same language and is also online.
