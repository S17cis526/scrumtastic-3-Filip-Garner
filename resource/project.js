/** @module project
 * A RESTful resource rpresenting a sofware project
 * implementing the L-CRUD methods
 */
 "use strinct";

module.exports={
	list: list,
	create: create,
	read: read,
	update: update,
	destroy: destroy
}
/** @function list
 * Sends a list of all projects as a JSON array
 */
function list(req, res, db){
	db.all("SELECT * FROM projects", [], function(err,projects){
		if(err){
			console.error(err);
			res.statusCode=500;
			res.end("Server Error");
		}
		res.setHeader("Content-Type","text/json");
		res.end(JSON.stringify(projects));
	});
}

/**@funciton create
 * Creates a new project and adds it to the database
 */
function create(req, res, db){
	var body="";
	
	req.on("error",function(err){
		console.error(err);
		res.statusCode=500;
		res.end("Server error");
	});
	
	req.on("data",function(data){
		body +=data;
	});
	
	req.on("end",function(){
		var project=JSON.parse(body);
		db.run(("INSERT INTO projects (name, description, repository, license) VALUES (?,?,?,?)"),
		[project.name,project.description,project.version,project.repository,project.license],
		function(err){
			if(err){
				console.error(err);
				res.statusCode = 500;
				res.end("Could not insert project into database");
				return;
			}
			res.statusCode=200;
			res.end();
		});
	});
}


/**@function read
 * Serves a specific project as a JSON string
 */
function read(req,res,db){
	var id=req.params.id;
	db.get("SELECT * FROM projects WHERE id=?", [id], function(err,project){
		if(err){
			console.error(err);
			res.statusCode=500;
			res.end("Server error");
			return;
		}
		if(!project){
			res.statusCodee=404;
			res.end("Project not found");
			return;
		}
		res.setHeader("Content-Type","text-json");
		res.end(JSON.stringify(project));
		}
	);
}

/**@function update
 * updates a project in the database
 */
function update(req,res,db){
	var body="";
	
	req.on("error",function(err){
		console.error(err);
		res.statusCode=500;
		res.end("Server error");
	});
	
	req.on("data",function(data){
		body +=data;
	});
	
	req.on("end",function(){
		var project=JSON.parse(body);
		db.run(("UPDATE projects SET name=?, description=?, repository=?, license=?"),
		[project.name,project.description,project.version,project.repository,project.license],
		function(err){
			if(err){
				console.error(err);
				res.statusCode = 500;
				res.end("Could not update project into database");
				return;
			}
			res.statusCode=200;
			res.end();
		});
	});
}

/**@function destroy
 * removes the specified project form the database
 */
function destroy(req,res,db){
	var id=req.prams.id'
	db.run("DELETE FROM projects WHERE id=?",[id],function(err){
		if(err){
			console.error(err);
			res.statusCode=500;
			res.end();
			return;
		}
		res.statusCode=200;
		res.end();
	});
}