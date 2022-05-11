# CrowdFunding

This project to create a crowdfunding website, where entrepreneurs can post their campaigns and consumers can invest.

Tools, frameworks:
1. Hardhat, Mocha, Chai, Alchemy, ethers.js (for smart contract)
2. Vite (for React)
3. Tailwindcss (for css)

**DANGEROUS NOTE**
1. I put private key of account to github to demo project, so after someday, someone will steal all money in this account (by tool).

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

**Bugs**

1. Not put private key in " " or ' ' in file .secret

2. const Input=()=>{} will not run. True: const Input=()=>() 

3. Run file scripts/deploy.js in other folder will have different result (bug). Use getcwd() to fix bug 'Cannot open file'

4. Nested Route must use keyword index={true}

5. When use tailwind, must add className, example < tag input type="text"> will not have outline. True: < tag input type="text" className="outline">

Next Task:
- Create request
- Show request
- Accept request
