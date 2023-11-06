export const getMessageById = async (
  messageId: string
): Promise<any | null> => {
  try {
    const apiUrl = `http://localhost:5001/messages/${messageId}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error fetching message:", error);
    return null;
  }
};
