This is a demo of a full stack application based on [Next.js] framework

## Getting Started

First, run the development server:

npm run dev
## or
yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to run application


## technologies

framework:

- [Next.js] (https://nextjs.org/docs) 

- [mongoDB] collection and document based database without sql 

## Data storage

- [RickMartin api] (https://rickandmortyapi.com/api/character)

- [mongoDB cloud databse]

## features of this application:

1) fetch data from api 

2) manage a favorite list at mongoDB 

3) manage comments for characters

4) using Next.js technology, this application is hybrid in terms of SSR (server side rebdering)

and CSR (client side rendering)

## new features at branch cache_db:

original data except images (of https://rickandmortyapi.com/api/character) is cached at mongoDB of this backend server for quick access. avery a few hours (configurable), the cache is updated by original data

## branch imageDownload :

images is downloaded from https://rickandmortyapi.com/api/character and cached at mongoDB as well

