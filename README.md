# CrowdFunding

This project to create a crowdfunding website, where entrepreneurs can post their campaigns and consumers can invest.

Tools, frameworks:
1. Hardhat, Mocha, Chai, Alchemy, ethers.js (for smart contract)
2. Vite (for React)
3. Tailwindcss (for css)

**DANGEROUS NOTE**
1. I put private key of account to github to demo project, so after someday, someone will steal all money in this account (by tool).

**Bugs**

1. Not put private key in " " or ' ' in file .secret

2. const Input=()=>{} will not run. True: const Input=()=>() 

3. Run file scripts/deploy.js in other folder will have different result (bug). Use getcwd() to fix bug 'Cannot open file'

4. Nested Route must use keyword index={true}

5. When use tailwind, must add className, example < tag input type="text"> will not have outline. True: < tag input type="text" className="outline">

**Step to do this project**
1. mkdir client && mkdir smart-contract
2. cd smart-contract
3. npm init -y
4. npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
5. npx hardhat
6. Write smart contract
7. Test smart contract (with compile)
8. Write file scripts/deploy.js and create react app (by vite) to save address and abi after deploy contract

8.1. npm init vite@latest (project name: ./, package name: optional, other: react)

8.2. npm install

8.3. npm run dev (open localhost:3000)

9. Create file .secret to contain private key (32 bytes), config Alchemy, get http key of Alchemy, config file hardhat.config.js
10. Deploy contract: npx hardhat run scripts/deploy.js --network ropsten

11. cd client (code front-end)
12. npm install -D tailwindcss postcss autoprefixer (use tailwindcss for css, link setup: https://tailwindcss.com/docs/guides/create-react-app)
13. npx tailwindcss init -p
14. Change some file like instruction in above website
15. npm install ethers
16. Code front-end
17. mkdir server && cd server
18. npm init -y
19. npm i express jsonwebtoken mongoose dotenv argon2 cors (dotenv -> environment variable, argon2 -> hash user's password, cors -> front-end to with back-end)
20. npm i --save-dev nodemon
21. Change file package.json, field "scripts" add: "server":"nodemon index", after that when we type "npm run server", file index.js will automatically run after any changed.
22. Install extension REST client to call api instead of using POSTMAN
23. Create file index.js and connect to PORT 5000
24. Set up mongodb

24.1. Go to mongodb website

24.2. Create new Prj

24.3. Create new Cluster (create file .env)

24.4. Allow accept from anywhere

24.5. Copy url to connect this cluster

25. mkdir models and create models
26. mkdir controllers and create controllers
27. mkdir routes and create routes

Next Task:
- Add backend to store introduction about campaign (text + pictures)
  - Short introduction (and 1 picture) in page Home
  - Detail intro (and many pictures) in page Campaign
  - Form in page CreateCampaign

