import axios from 'axios';
import { baseUrl, userUrl } from './backendUrl';
import _ from 'underscore';

/* All requests for the users data */
export async function getUser(user){
  return await axios.post(userUrl, user)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.error);
            return error.error;
        });
}

/* All requests for the students data */
// GET Request
export async function getData(){
    return await axios.get(baseUrl)
        .then(
            res => {
            var sortedStudents = _.sortBy(res.data, "Name");
            return sortedStudents;
        })
        .catch( error => {
            console.log(error.error);
          });
}

export async function getDetails(url){
    return await axios.get(baseUrl+url)
      .then(
        res => {
          return res.data;
      })
      .catch(error => {
      console.log(error);
    });
}

// POST Request

export async function sendData(reg){
   return await axios.post(baseUrl, reg)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.error);
            return error.error;
        });
}

// PUT Request

export async function updateDetails(url, student){
    return await axios.put(baseUrl+url, student)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error.error);
      return error.error;
    });
  }

// DELETE Request

export async function deleteData(url){
    return await axios.delete(baseUrl+url).then(res => {
        return res.data;
      })
      .catch(error=>{
        console.log(error.error);
      });
    }
