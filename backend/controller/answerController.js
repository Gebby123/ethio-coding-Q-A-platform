const dbConnection = require("../db/dbConfig");

// Function to post an answer to the answers table
async function postAnswer(req, res) {
	const questionId = req.params.questionid;
    const userid = req.user.userid;
	const answerText = req.body.answer;

	try {
		// Insert the answer into the answers table


		const answerQuery =
			"INSERT INTO answers (questionid, userid,  answer) VALUES (?,?, ?)";
		await dbConnection.query(answerQuery, [questionId, userid, answerText]);
		console.log(userid);
		// console.log(answerText);
		console.log(questionId);

		if (answerText.length === 0) {
			return res.status(404).json({ msg: "please provide your answer" });
		}

		res.status(201).json({ msg: "Answer posted successfully" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ msg: "Something went wrong while posting the answer" });
	}
}



async function answers(req, res) {

	try {
		const { questionid } = req.params;

		const [answers] = await dbConnection.query(
      `SELECT answers.answer, users.username FROM answers INNER JOIN users ON answers.userid = users.userid  
            WHERE answers.questionid = ? `,
      [questionid]
    );
   
		
		// Send the retrieved answers as a JSON response
		res.status(200).json({ answers });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ msg: "Something went wrong while fetching answers" });
	}
}





module.exports = { postAnswer , answers} ;
