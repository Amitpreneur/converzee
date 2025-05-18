import { getUser } from "../Util";
//TABMESSAGEING MODAL
export function TabMessagingModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    toolData: {
      isImage: data.isImage,
      emoji: data.emoji,
      FAVICON: data.FAVICON,
      messages: data.messages,
      timeFirstMsg: data.timeFirstMsg,
      timeBetweenTwoMsg: data.timeBetweenTwoMsg,
      SOUND: data.SOUND,
    },
    CODE: data.CODE,
  };
  return toolData;
}
// _id: id, toolName: ToolUtil.getTool(data.toolId), toolId: data.toolId, name: data.data
export function TabMessagingModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    isImage: data.toolData.isImage,
    emoji: data.toolData.emoji,
    FAVICON: data.toolData.FAVICON,
    messages: data.toolData.messages,
    timeFirstMsg: data.toolData.timeFirstMsg,
    timeBetweenTwoMsg: data.toolData.timeBetweenTwoMsg,
    SOUND: data.toolData.SOUND,
    CODE: data.CODE,
  };
}
//END TABMESSAGEING
//Urgency timer
export function UrgencyTimerModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    TEXT: data.TEXT,
    CODE: data.CODE,
    STYLE: data.STYLE,
    TIMER: data.TIMER,
    toolData: data.toolData,
  };
  return toolData;
}

export function UrgencyTimerModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    TEXT: data.TEXT,
    CODE: data.CODE,
    STYLE: data.STYLE,
    TIMER: data.TIMER,
    toolData: data.toolData,
  };
}
//END URGENCY
//HELLO BAR
export function HELLOBARModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    create: data.create,
    cta: data.cta,
    timer: data.timer,
    layout: data.layout,
    STYLE: data.STYLE,
    CODE: data.CODE,
    toolData: { templateType: data.templateType },
  };
  return toolData;
}

export function HELLOBARModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    create: data.create,
    cta: data.cta,
    timer: data.timer,
    layout: data.layout,
    STYLE: data.STYLE,
    CODE: data.CODE,
    //templateType: data.toolData.templateType
  };
}
//END HELLO BAR
//IMagePopup
export function ImagePopupModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    image: data.image,
    CODE: data.CODE,
  };
  return toolData;
}

export function ImagePopupModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    image: data.image,
    CODE: data.CODE,
  };
}
//End IMage Popup
//Video Popup
export function VideoPopUpModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    TEXT: data.TEXT,
    video: data.video,
    CODE: data.CODE,
    STYLE: data.STYLE,
    image: data.image,
  };
  return toolData;
}

export function VideoPopUpModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    TEXT: data.TEXT,
    video: data.video,
    CODE: data.CODE,
    STYLE: data.STYLE,
    image: data.image,
  };
}
//End VideoPopup
//Central timer
export function CentralTimerModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    TEXT: data.TEXT,
    timer: data.timer,
    layout: data.layout,
    CODE: data.CODE,
    STYLE: data.STYLE,
  };
  return toolData;
}

export function CentralTimerModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.name,
    toolName: data.toolName,
    TEXT: data.TEXT,
    timer: data.timer,
    layout: data.layout,
    CODE: data.CODE,
    STYLE: data.STYLE,
  };
}
//End Central Timer
// Geo Redirection
export function GeoRedirectionModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    redirection: data.redirection,
    CODE: data.CODE,
  };
  return toolData;
}

export function GeoRedirectionModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    redirection: data.redirection,
    CODE: data.CODE,
  };
}
//End Geo Redirection
//Break Even Calculator
export function BreakEvenCalculatorModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    number: data.number,
  };
  return toolData;
}

export function BreakEvenCalculatorModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    number: data.number,
  };
}
//End BreakEvenCalculator
//Exit intent
export function ExitIntentModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    toolData: {
      headline: data.headline,
      subheadline: data.subheadline,
      mediaType: data.mediaType,
      url: data.url,
      ctaText: data.ctaText,
      ctaAction: data.ctaAction,
      redirectUrl: data.redirectUrl,
      noThanksText: data.noThanksText,
      isInput: data.isInput,
    },
    CODE: data.CODE,
    STYLE: data.STYLE,
  };
  return toolData;
}

export function ExitIntentModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    headline: data.toolData.headline,
    subheadline: data.toolData.subheadline,
    mediaType: data.toolData.mediaType,
    url: data.toolData.url,
    ctaText: data.toolData.ctaText,
    ctaAction: data.toolData.ctaAction,
    redirectUrl: data.toolData.redirectUrl,
    noThanksText: data.toolData.noThanksText,
    isInput: data.toolData.isInput,
    CODE: data.CODE,
    STYLE: data.STYLE,
  };
}
//End ExitIntent
//Mobile Vibrator
export function MobileVibratorModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    TEXT: data.TEXT,
    toolData: data.timing,
    CODE: data.CODE,
  };
  return toolData;
}

export function MobileVibratorModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    TEXT: data.TEXT,
    timing: data.toolData,
    CODE: data.CODE,
  };
}
//End Mobile Vibrator
//Email Intragation
export function EmailIntragationModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    TEXT: data.TEXT,
    timer: data.timer,
    layout: data.layout,
    CODE: data.CODE,
    STYLE: data.STYLE,
  };
  return toolData;
}

export function EmailIntragationModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    TEXT: data.TEXT,
    timer: data.timer,
    layout: data.layout,
    CODE: data.CODE,
    STYLE: data.STYLE,
  };
}
//End Email intration
//Image Optimation
export function ImageOptimaztionModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    TEXT: data.TEXT,
    timer: data.timer,
    layout: data.layout,
    CODE: data.CODE,
    STYLE: data.STYLE,
  };
  return toolData;
}

export function ImageOptimaztionModalResponse(res) {
  const data = res.data;
  console.log(data);
}
//End Image Optimation
//Dynamic Element
export function DynemicElementModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    toolData: { items: data.items },
    STYLE: data.STYLE,
    CODE: data.CODE,
  };
  return toolData;
}

export function DynemicElementModalResponse(res) {
  const data = res.data.data;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    items: data.toolData.items,
    CODE: data.CODE,
    STYLE: data.STYLE,
  };
}
//End Dynemic Element
//Offer Iframe
export function OfferIframeModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    TEXT: data.TEXT,
    timing: data.timing,
    CODE: data.CODE,
  };
  return toolData;
}

export function OfferIframeModalResponse(res) {
  const data = res.data;
  console.log(data);
}
//End Offer iframe
//Backbutton Redirection
export function BackButtonRedirectionModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    TEXT: data.TEXT,
    CODE: data.CODE,
  };
  return toolData;
}

export function BackButtonRedirectionModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    TEXT: data.TEXT,
    CODE: data.CODE,
  };
}
//End Backbutton Redirection
//HelloBarTimer
export function HelloBarTimerModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    create: data.create,
    cta: data.cta,
    timer: data.timer,
    layout: data.layout,
    CODE: data.CODE,
    STYLE: data.STYLE,
    toolData: { templateType: data.templateType },
  };
  return toolData;
}

export function HelloBarTimerModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    create: data.create,
    cta: data.cta,
    timer: data.timer,
    layout: data.layout,
    CODE: data.CODE,
    STYLE: data.STYLE,
    // templateType: data.toolData.templateType
  };
}
//End HelloBArTimer

//ChatBot
export function ChatBotModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    chattitle: data.chattitle,
    chats: data.chats,
    CODE: data.CODE,
    STYLE: data.STYLE,
    contact: data.contact,
    support: data.support,
    initChat: data.initChat,
  };
  return toolData;
}

export function ChatBotModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    chattitle: data.chattitle,
    chats: data.chats,
    CODE: data.CODE,
    STYLE: data.STYLE,
    contact: data.contact,
    support: data.support,
    initChat: data.initChat,
    // templateType: data.toolData.templateType
  };
}
//End ChatBot

//Optin Form Modal
export function OptinFormModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    CODE: data.CODE,
    toolData: data.toolData,
    AutoResponder: data.AutoResponder
  };
  return toolData;
}

export function OptinFormModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    CODE: data.CODE,
    toolData: data.toolData,
  };
}
//End Optin Form Modal

//Template Club Modal
export function TemplateClubModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    CODE: data.CODE,
    toolData: data.toolData,
    items: data.items ,
    AutoResponder: data.AutoResponder
  };
  return toolData;
}

export function TemplateClubModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    CODE: data.CODE,
    items: data.items,
    toolData: data.toolData,
  };
}
//End Template Club Modal

//Auto play video
export function autoplayVideoModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    CODE: data.CODE,
    toolData: data.toolData,
    icons: data.icons,
    video: data.video,
    image: data.image
  };
  return toolData;
}

export function autoplayVideoModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    CODE: data.CODE,
    toolData: data.toolData,
    icons: data.icons,
    video: data.video,
    image: data.image
  };
}
//End Auto play video

//Proof App
export function proofAppModal(data) {
  const toolData = {
    _id: data._id || null,
    name: getUser(),
    toolId: data.toolId,
    status: true,
    title: data.name,
    toolName: data.toolName,
    CODE: data.CODE,
    toolData: data.toolData,
    STYLE: data.STYLE
  };
  return toolData;
}

export function proofAppModalResponse(res) {
  const data = res.data.data;
  if (!data) return null;
  return {
    _id: data._id,
    toolId: data.toolId,
    status: data.status,
    name: data.title,
    toolName: data.toolName,
    CODE: data.CODE,
    toolData: data.toolData,
    STYLE: data.STYLE
  };
}
//End Auto play video