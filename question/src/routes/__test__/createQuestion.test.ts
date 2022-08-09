import request from "supertest";
import { app } from "../../app";

test("has a route handler listening to /questions for post requests", async () => {
	const response = await request(app).get("/questions").send({});

	expect(response.status).not.toEqual(404);
});
test("can only be accessed if the user is signed in", async () => {
	await request(app).post("/questions").send({}).expect(401);
});

// it("returns a status other than 401 if the user is signed in", async () => {
// 	const response = await request(app)
// 		.post("/api/questions")
// 		.set("Cookie", global.signin())
// 		.send({});

// 	expect(response.status).not.toEqual(401);
// });

// it("returns an error if an invalid title is provided", async () => {
// 	await request(app)
// 		.post("/api/questions")
// 		.set("Cookie", global.signin())
// 		.send({
// 			title: "",
// 			price: 10,
// 		})
// 		.expect(400);

// 	await request(app)
// 		.post("/api/questions")
// 		.set("Cookie", global.signin())
// 		.send({
// 			price: 10,
// 		})
// 		.expect(400);
// });

// it("returns an error if an invalid price is provided", async () => {
// 	await request(app)
// 		.post("/api/questions")
// 		.set("Cookie", global.signin())
// 		.send({
// 			title: "asldkjf",
// 			price: -10,
// 		})
// 		.expect(400);

// 	await request(app)
// 		.post("/api/questions")
// 		.set("Cookie", global.signin())
// 		.send({
// 			title: "laskdfj",
// 		})
// 		.expect(400);
// });

// it("creates a question with valid inputs", async () => {
// 	let questions = await Question.find({});
// 	expect(questions.length).toEqual(0);

// 	const title = "asldkfj";

// 	await request(app)
// 		.post("/api/questions")
// 		.set("Cookie", global.signin())
// 		.send({
// 			title,
// 			price: 20,
// 		})
// 		.expect(201);

// 	questions = await Question.find({});
// 	expect(questions.length).toEqual(1);
// 	expect(questions[0].price).toEqual(20);
// 	expect(questions[0].title).toEqual(title);
// });
