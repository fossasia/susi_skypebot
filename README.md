## Getting Started with SUSI Skype Bot:

To add SUSI Skype bot as a friend click on   [Add SUSI as a friend](https://join.skype.com/bot/5d336a42-124a-4b79-bbbe-788998da27a1) and if you want to make your own SUSI Skype bot then follow below given steps:

## Pre-requisites:

- Microsoft&#39;s developer Bot Framework Account
- Github Account
- Heroku Account

## Steps:

1. Fork this repository.

2. You have to replace appID and appPassword with your own ID and Password which you can get by below given steps.

3. Sign in/Sign up to this [https://dev.botframework.com/](https://dev.botframework.com/). After signing in go to My Bots option at the top of the page and Create/Register your bot. Enter details of your bot and click on &quot;Create Microsoft App ID and password&quot;.

   ![CREATE_BOT](/docs/images/createbot.PNG)
   

   ![BOT_PROFILE](/docs/images/BotProfile.PNG)

4. Leave messaging endpoint for now after getting app ID and password we will write messaging endpoint.

5. Copy your APP ID and Password and save them for later use. Paste your App ID in box given for ID on bot registration page.

   ![APP_ID](/docs/images/AppID.PNG)

6. Now we have to create messaging endpoint to listen for requests. We have to deploy this github repository to heroku to get url for messaging endpoint.

   If you don&#39;t have account on heroku sign up here [https://www.heroku.com/](https://www.heroku.com/) else just sign in and create a new app.

   ![HEROKU_APP](/docs/images/Heroku_new_app.PNG)

   Deploy forked repository onto heroku from deploy option and choosing github as a deployment method.

   ![HEROKU_DEPLOY](/docs/images/Heroku_deploy.PNG)

   Select automatic deployment so that you make any changes in github repository they should be deployed to heroku.

   ![AUTOMATIC_DEPLOY](/docs/images/Automatic_deploys.PNG)

7. Open you app from option on top right and copy the link of your heroku app and append it with /api/messages and enter this url as messaging endpoint.

         https://{Your-App-Name}.herokuapp.com/api/messages

8. Register the bot and add APP ID and password you saved to your heroku app in settings-&gt;config variables.

9. Now go to   [https://dev.botframework.com/](https://dev.botframework.com/) and then in My Bots go to your bot and click on Skype bot then add it to contact and start chatting.

## SUSI Skype Bot: 

   ![SUSI_SKYPE](/docs/images/skypebot.PNG)
