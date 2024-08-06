import Agent from '@services/agent/agent';
import UserData from '@services/userService';
import axios from 'axios';
import JobProcessedInfo from 'src/content/contentScript';

const apiUrl = import.meta.env.VITE_API_URL;

interface UserProcessedInfo{
    profession: string,
    bio: string,
    location: string,
    skills: Array<string>
}

interface AgentResponse{
  selectionProbabilities: string,
  rankingCriteria: string,
  agentResponse: string,
  companyName: string
}


// Get user info
async function getUserInfo(){
  const token = await chrome.storage.local.get(["token"]);
  const config = {
    headers: { Authorization: `Bearer ${token.token}` }
  };
  try {
      const response = await axios.get(`${apiUrl}/auth/validate`, config);
      return response.data as UserData;
  } catch (error) {
      console.log(error);
  }
}

// Process user info
function processUserData(data:UserData){
const cleanData:UserProcessedInfo = {
  profession: data.profile.profession,
  bio: data.profile.bio,
  location: data.profile.location,
  skills: data.skills.map(element => {
      return element.Skill.name
  })
}

return cleanData
}


// Ask Agent
async function askAgent(userInfo:UserProcessedInfo, jobInfo:JobProcessedInfo){
  const data = {
    userInfo: userInfo,
    jobInfo: jobInfo
  }

  const agent = new Agent("vercel")
  const agentResponse = await agent.askAgent(JSON.stringify(data))
  return agentResponse
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('linkedin.com/jobs')) {
    console.log('Execute script');
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['assets/contentScript.js', 'assets/editHTML.js'],
    }).catch((error) => {
      console.error('Error executing content script:', error);
    });
  }
});

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === 'SCRAPED_DATA') {
    console.log('Data received from content script:', message.data);
    const jobInfo = message.data;
    const userData = await getUserInfo().then((response) => processUserData(response as UserData));
    const agentResponse: AgentResponse = await askAgent(userData, jobInfo);
    chrome.storage.local.set({ agentResponse: agentResponse }, async () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id as number, { msg: 'agentResponse_saved', data: agentResponse });
      });
    });
  }
});

