using back_end.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace back_end.Utils
{
    public class JsonUtils<T> : IJsonUtils<T> where T:BaseEntity
    {
        public string dir = Directory.GetCurrentDirectory();
        public string file
        {
            get 
            {
                string className = typeof(T).FullName.Split(".").Last().ToLower();
                string _file = Path.Join(dir + "/fakedbjson/", className + ".json");
                return _file;
            }
        }

       

        public IEnumerable<T> readAllJson()
        {
            try
            {
                if (!File.Exists(file))
                {
                    File.Create(file);
                    return null;
                }
                string jsonObj = File.ReadAllText(file);
                return JsonConvert.DeserializeObject<List<T>>(jsonObj);
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public T readSingle(object id)
        {
            try
            {
                if (!File.Exists(file))
                {
                    File.Create(file);
                    return null;
                }
                string jsonObj = File.ReadAllText(file);
                return JsonConvert.DeserializeObject<List<T>>(jsonObj).Where(x=>x.Id.ToString()==id.ToString()).SingleOrDefault();
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public bool writeAll(IEnumerable<T> obj)
        {
            try
            {
                //get all from file json 
                IEnumerable<T> getallObj = readAllJson();
                //add new object to list
                getallObj.ToList().AddRange(obj);
                string serializeObj = JsonConvert.SerializeObject(getallObj);
                //after write all
                if (!File.Exists(file))
                {
                    File.Create(file);
                    File.WriteAllText(file, serializeObj);
                }
                File.WriteAllText(file, serializeObj);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool writeSingle(T obj)
        {
            List<T> newObj = new List<T>();
            try
            {
                //get all from file json 
                IEnumerable<T> getallObj = readAllJson();
                if (getallObj == null)
                {
                    newObj.Add(obj);
                }
                else
                {
                    newObj = getallObj.ToList();
                    newObj.Add(obj);
                }

                //add new object to list
                

                //convert to string
                string serializeObj = JsonConvert.SerializeObject(newObj);
                //after write all
                if (!File.Exists(file))
                {
                    File.Create(file);
                    File.WriteAllText(file, serializeObj);
                }
                File.WriteAllText(file, serializeObj);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }

}
