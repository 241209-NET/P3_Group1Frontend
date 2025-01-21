# Group1Frontend
Group 1 front end for project 3

## Overview
PLEY - The Reverse Yelp App

PLEY is a unique app that lets stores rate and review their customers. It’s a helpful tool for businesses to share feedback with each other about customer behavior, making it easier to spot and avoid problematic customers. By working together, stores can create a better experience for everyone and keep their spaces safe and enjoyable.

## Project Management System
https://trello.com/b/ty8JcQUv/pley

## Members
- Ludia Park
- Joseph Savage
- Praween Pongpat
- Eldhose Salby
- Rohit Rathor
- Kashyap Bathani
- Justin Theyskens

## ERD

![image](https://github.com/user-attachments/assets/4eb1d1ae-24b9-4cbd-9a01-c17d59271bb4)

## User Stories
- Restaurants should be able to create a new Restaurant Profile
- Restaurants should be able to find Customers by Id.
- Restaurants should be able to create a review for that customer which includes a rating and a comment.
- Restaurants can also edits those reviews
- Restaurants can sort customers by ratings and by number of reviews

## MVP
- create Restaurant Profiles
- Edit logins
- create / edit / delete reviews
- create User Profiles
- login authentication 
  
## Requirements
- Application Must build and run
- Unit Testing (70% branch coverage for Services and Utilities/Business Logic)
- CI/CD Pipeline
- Implement Secure Authentication (user login / registration)
- Frontend
    - React
    - Styling: plain CSS, Tailwind, bootstrap, etc.
    - Hosted on Azure
- Backend
    - ASP.NET API
    - Docker containerized
    - Hosted on Azure
- SQLServer DB hosted on Azure

## Technology
- C# (Backend programming language)
- EF Core (ORM)
- SQL Server (Azure hosted)
- ASP.NET Core (Web API Framework)
- xUnit/Moq (Backend Testing)
- Azure (for application hosting)
- React as front end
- Github Action or Azure Pipeline for CICD Pipeline
- Docker for containerization

## Stretch goals
- Make it pretty
- display top customers (hall of fame)
- display worst customers (hall of shame)
- Adding address of Restaurant
