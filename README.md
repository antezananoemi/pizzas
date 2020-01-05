# Pizza Menu

This project have these Models:

- Pizza
- Toppings

Functionalities:

- Get all Pizzas (home)
- See Pizza (click on the image or name of the pizza)
- Get Toppings (see toppings list on Toppings Page /toppings)
- Add new toppings, on the same page you can add new toppings
- Delete topping (delete each topping clicking the X new to the name of the topping)
- Delete Pizza, on the pizza list you can erase pizzas by clicking on the Delete button
- add Pizza, on Create pizza page, you can create new pizzas with different toppings
- changing topping to pizzas, you can change topping by clicking the update toppings button on each pizza.
- get the pizza toppings, on the list you can see the toppings for each pizza by the side of the pizza.

## Instalation Requirements

- Nodejs 8 or more

## Instalation

Follow the next steps:

### 1. Dependencies

After cloning the project, you need to run npm i on the source folder and on the /client folder

```bash
npm install
```

After installing dependencies

For Dev ENV

```bash
npm run dev # on the source folder, this will trigger both the backend and the client

```

For Production

To mock a production server, you can follow the next steps:

```bash
npm install -g serve
serve -l 3000 -s build # to serve the frontend on the /client folder
npm run server # to serve the backend in the source folder /
```
