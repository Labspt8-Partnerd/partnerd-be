import { User, Project } from "../models/Model";
import jwt from "jsonwebtoken";

function users() {
  return User.find();
}

function projects() {
  return Project.find();
}

function user(_parent: any, args: { id: number }, context: any) {
  if (args.id) {
    return User.findById(args.id);
  } else {
    let token = context.req.headers.cookie.split("=")[1];
    let loggedInUser: any = jwt.decode(token);
    return User.findById(loggedInUser.subject);
  }
}

function username(_parent: any, args: { username: string }) {
  return User.findBy(args.username);
}

function userEmail(_parent: any, args: { email: string }) {
  return User.findBy(args.email);
}

function project(_parent: any, args: { id: number }) {
  return Project.findById(args.id);
}

export default {
  users,
  projects,
  user,
  project,
};
