FROM node:14-slim            
WORKDIR /opt/streets/client/ 
COPY . .                     
RUN npm install              
RUN npm i -g serve           
RUN npm run build            
CMD serve -s -l 3003 build/  
