"use server";

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const gemini = new GoogleGenerativeAI(process.env.NEXT_GOOGLE_GEMINI_AI_API_KEY);

const model = gemini.getGenerativeModel({
    model: "gemini-1.5-pro-002",
    systemInstructions: `I want you to work as a highly experienced and skilled AI Prompt Engineer. You aim to generate AI prompts that guide language models like GPT-4 to deliver clear, precise, and valuable responses across diverse use cases.\n\nThe generated prompt should be very clear, highly specific, and written in technical words. You should write each prompt using paragraph(s) and bullet points (only when necessary) without any grammar or spelling errors. Use [input name] bracket format where the user needs to add input from their side before using prompts.\n\nFollow the structured instructions below to craft the prompt:\n\n1. Define the Task: Clearly articulate the purpose of the AI prompt. Identify if it aims to inform, analyze, solve, create, or simulate an interaction. Ensure the objective is tailored for practical use in a specified context.\n2. Adopt a Relevant Persona: Choose a persona relevant to the task (e.g., expert analyst, friendly assistant, experienced educator). Describe the persona’s background briefly to enhance the model’s understanding of tone and approach.\n3. Break Down the Prompt into Steps: Structure the prompt in clear steps, especially if the task is complex. Define each step the model should take to achieve the final output, with each instruction being specific, actionable, and concise.\n4. Specify Output Format and Length: Indicate whether the output should be in paragraphs, bullet points, tables, or code. If needed, suggest a word count, number of sentences, or other length constraints.`,
});

const config = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export async function generatePrompt(message: string): Promise<string> {
    const parts = [
        {
            text: "I want you to work as a highly experienced and skilled AI Prompt Engineer. You aim to generate AI prompts that guide language models like GPT-4 to deliver clear, precise, and valuable responses across diverse use cases. Generate a prompt very clear, highly specific, and written in technical words. You should write each prompt using paragraph(s) and bullet points (only when necessary) without any grammar or spelling errors.\n\n\nUse [input name] bracket format where the user needs to add input from their side before using prompts. These brackets indicate that users must fill in the information in this bracket before using this prompt.\n\n\nCreate the best prompt possible using the following guidance from an experienced prompt engineer.\n\n\n1. Define the Task: Clearly articulate the purpose of the AI prompt. Identify if it aims to inform, analyze, solve, create, or simulate an interaction. Ensure the objective is tailored for practical use in a specified context.\n2. Adopt a Relevant Persona: Choose a persona relevant to the task (e.g., expert analyst, friendly assistant, experienced educator). Describe the persona’s background briefly to enhance the model’s understanding of tone and approach.\n3. Break Down the Prompt into Steps: Structure the prompt in clear steps, especially if the task is complex. Define each step the model should take to achieve the final output, with each instruction being specific, actionable, and concise.\n4. Specify Output Format and Length: Indicate whether the output should be in paragraphs, bullet points, tables, or code. If needed, suggest a word count, number of sentences, or other length constraints.",
        },
        { text: "input: Generate a Content Calendar in One Click AI Prompt" },
        {
            text: "output: I want you to work as a very experienced and skilled content specialist. Your task is to create a detailed content plan.\n\nCreate a comprehensive content calendar focused on the topic of [insert keyword or category]. The calendar should include a variety of content types, strategically planned to engage the target audience, improve SEO, and align with the overall content strategy. The calendar must be creative, well-researched, and detailed, considering trends, audience preferences, and SEO best practices.\n\nInstructions:\n\n1. Understanding the Topic: Begin by analyzing the topic or category provided ([insert topic or category]). Break down the topic into subtopics, themes, and related keywords. Research current trends, challenges, and opportunities within this space.\n\n2. Audience Analysis: Identify the target audience for this content. Consider their demographics, interests, pain points, and the type of content they typically engage with. This will guide the tone, format, and approach for the content calendar.\n\n3. Content Goals: Define the primary objectives for the content calendar. Whether it's to increase brand awareness, drive traffic, generate leads, or build community engagement, the content ideas should align with these goals.\n\n4. Content Pillars: Establish key content pillars that support the main topic. These pillars should reflect the core themes or categories under [insert topic or category]. Each pillar will guide the development of multiple content pieces.\n\n5. Content Types & Formats: Diversify the content by including various types and formats such as:\n- Blog Posts: Long-form, short-form, listicles, how-to guides, case studies, etc.\n- Social Media Content: Tweets, Instagram posts, LinkedIn articles, etc.\nVideos & Webinars: Educational videos, interviews, live Q&A sessions, etc.\n- Infographics & Visual Content: Charts, diagrams, infographics, etc.\n- Interactive Content: Quizzes, polls, surveys, interactive tools, etc.\n- Podcasts & Audio Content: Podcast episodes, audio blogs, etc.\n\n6. Keyword Research & SEO: Conduct keyword research to identify high-traffic keywords related to [insert topic or category]. Each content idea should be optimized with relevant keywords, meta descriptions, and headers to enhance SEO performance.\n\n7. Calendar Layout: Organize the content ideas into a calendar format. Specify publishing dates, content formats, titles, keywords, and target audience for each piece of content. Consider seasonal trends, product launches, and other significant dates when scheduling.\n\n8. Engagement & Distribution: Plan the distribution strategy for each content piece. Include social media promotion, email marketing, influencer outreach, and other channels that will help maximize reach and engagement.\n\n9. Performance Metrics: Suggest KPIs and metrics to track the success of each content piece and the overall content calendar. Examples include page views, social shares, lead generation, conversion rates, and audience engagement.\n\n10. Review & Iterate: Include a review process for analyzing the performance of the content calendar. Suggest regular audits to adjust the strategy based on data insights and audience feedback.\n\nFinal Output: A detailed content calendar in a table format that includes the following columns:\n- Content Titles & Topics\n- Publishing Schedule\n- Content Formats\n- Target Audience\n- SEO Keywords\n- Distribution Plan\n- Performance Metrics\n\nNow create a comprehensive content calendar.",
        },
        { text: "input: AI Prompt for YouTube SEO Title and Description with Tags" },
        {
            text: 'output: You are a very experienced and skilled keyword expert. You have great experience in writing clickbait keyword titles for YouTube videos. Clickbait keyword YouTube titles are those that contain keywords and some powerful words that increase the click-through rate on that video.\n\nYou have to create 15 clickbait keyword YouTube titles for me based on the given keywords, placing them according to the correct heading: beginning, middle and end. This means you will prepare 5 titles with the keyword at the beginning. Prepare another 5 titles with the keyword in the middle. Prepare another 5 titles with the keyword at the end.\n\nThen choose the best title from the suggested titles and explain your reasons. After which you will now write an SEO optimized YouTube video description of 1000 characters that is not detected by AI using the keywords chosen in the first sentence of the description.\n\nThen write 10 highly relevant and optimized hashtags.\n\nThen prepare 35 SEO tags. A tag is a combination of keywords that can be attached to this video title. Tags should be relevant to the title and separated by commas.\n\nNow write the YouTube video details as I said for keywords: "[Insert Your Keyword]"You are a very experienced and skilled keyword expert. You have great experience in writing clickbait keyword titles for YouTube videos. Clickbait keyword YouTube titles are those that contain keywords and some powerful words that increase the click-through rate on that video.\n\nYou have to create 15 clickbait keyword YouTube titles for me based on the given keywords, placing them according to the correct heading: beginning, middle and end. This means you will prepare 5 titles with the keyword at the beginning. Prepare another 5 titles with the keyword in the middle. Prepare another 5 titles with the keyword at the end.\n\nThen choose the best title from the suggested titles and explain your reasons. After which you will now write an SEO optimized YouTube video description of 1000 characters that is not detected by AI using the keywords chosen in the first sentence of the description.\n\nThen write 10 highly relevant and optimized hashtags.\n\nThen prepare 35 SEO tags. A tag is a combination of keywords that can be attached to this video title. Tags should be relevant to the title and separated by commas.\n\nNow write the YouTube video details as I said for keywords: "[Insert Your Keyword]"',
        },
    ];

    try {
        const prompt = `I want you to work as a very experienced and skilled AI Prompt Engineer. Your job is to create a very detailed and accurate prompt to \"${message}\". The generated prompt should be very clear, highly specific, and written in technical words. You should write the prompt using paragraph(s) and bullet points (only when necessary) without any grammar or spelling errors. Use [input name] bracket format where the user needs to add input from their side before using prompts.\n\nUse the following structure or concept to build a better prompt:\nI want you to work as a highly skilled and experienced [Persona Name]. [Task]. [Context]. [Format].\n[Additional details, clarifications, and specifications]\n[Rules and instructions for the task] (if applicable)\n\nReplace the brackets with appropriate sentences and paragraphs. Return only the prompt template without any other unnecessary details like examples and suggestions.`;
        const result = await model.generateContent(prompt, {
            contents: [{ role: "user", parts }],
            config,
        });

        const response = result.response.text();

        return response;
    } catch (error) {
        console.error(error);
        return "An error occurred while generating the prompt.";
    }
}
