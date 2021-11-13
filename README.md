# AspireIQ Assignment
## Features
- An email address input component supporting the user to type the email address
- The component allow the user to input multiple email addresses
- The user is able to delete an email address
- Autocomplete dropdown is available when matched email addresses are found
- When autocomplete dropdown is available, user could choose an email address by

  1 - click on the target email address

  2 - use **arrow up** or **arrow down** key to focus on a target email address, and press **ENTER** or **TAB** key

## Testing Environment
#### Node Version: V12.16.3
#### Browser: Chrome

## Steps to start on local
### 1. git clone the [repo](https://github.com/brian880120/aspireIQ-assignment) to local
### 2. In the project folder, run command
```sh
npm i
```
### 3. To start project on local, run command
```sh
npm run dev
```
### 4. dev server should be available by visiting http://localhost:3000/

## Test cases
#### 1. display autocomplete result
- type one or two letters in input field, if matched records are found, autocomplete results area should be displayed

#### 2. add an item from autocomplete result
- press **arrow down** or **arrow up** key to highlight an item in autocomplete result, press **ENTER** or **TAB** key. An email address item should be added with **valid status**
- click on an item in autocomplete result, an email address item should be added with **valid status**
- type some random characters in the input field, and press **ENTER** or **TAB** key, an item should be added with **invalid status**
- type an email address that fully matches an email address in autocomplete result and press **ENTER** or **TAB** key, an item should be added with **valid status**
- add an item that already exists, **nothing** should happen
- press **ENTER** or **TAB** key with empty input field, **nothing** should happen

#### 3. delete an email address
- hover over to an email address that has been added, a **x** button should be displayed
- click on  **x** should delete that email address from the list


## Things to be improved
##### With the time restriction that I gave to myself in this assignment, I can't make everyting perfect.
##### Here is the list of the tect debt that I could address if I have more time

##### From the tech perspective:
- React component unit test
- In `EmailInput.jsx`, I handled all user actions by defining function in this file, and I passed two functions to children components. This is not the best practice because:

  1 - Code in `EmailInput.jsx` will be too long to read if we have more requirements

  2 - Passing functions from parent component to children component chould be tidous, because we don't know how many intermediate components that we have between the parent component and the target child component

  3 - To solve the coding structure problem mentioned above, we could apply `useReducer + useContext` pattern. This I am happy to discuss in detail if I have a chance. `useReducer` could decouple the logic between `what to do` and `how to do` in the component, and `useContext` could help to allow children components to access parent state and function from anywhere in the component tree. However, `useReducer + useContext` pattern also has pros and cons, pros > cons for larger React project in my opionion.

##### From user perspective:
- Better mobile view support
- Invalid email address should have its own UI behaviour on mouse hover over
- **Backspace** button press should be supported if the user wants to delete an email address item (more logic needs to be handled in this case, because a **Backspace** press could mean delete a character from the current input field or delete an email address item)
- Email address format validation is good to have
