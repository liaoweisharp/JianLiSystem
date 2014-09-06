using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Data.Linq;

namespace DAL.Base
{
        
        public class Base 
        {
            public static string connStr { get; set; }
            protected  DAL.DTO.DataClassesDataContext dataContext;
            public Base()
            {
                dataContext = new DTO.DataClassesDataContext();
            }
            //~Base()
            //{
            //    Dispose();
            //}
            public  void Dispose()
            {
                if (dataContext != null)
                {
                    dataContext.Dispose();
                }
            }
            protected  T Save<T>(T obj) where T : class
            {
                T ins;
                dataContext.GetTable<T>().InsertOnSubmit(obj);
                try
                {
                    System.Data.Linq.ChangeSet cs = dataContext.GetChangeSet();
                    dataContext.SubmitChanges();//这个有事物的意思，还有回滚。
                    ins = cs.Inserts[0] as T;
                }
                catch
                {
                    ins = default(T);
                }
                return ins;
            }
            protected  List<T> Saves<T>(List<T> objs) where T : class
            {
                List<T> isAllSuccess = new List<T>();

                if (objs != null)
                {
                    dataContext.GetTable<T>().InsertAllOnSubmit<T>(objs);

                    try
                    {
                        ChangeSet cs = dataContext.GetChangeSet();
                        dataContext.SubmitChanges();//这个有事物的意思，还有回滚。
                        foreach (T ins in cs.Inserts)
                        {
                            isAllSuccess.Add(ins);
                        }
                    }
                    catch
                    {
                        isAllSuccess = null;
                    }
                }
                return isAllSuccess;
            }
            /// <summary>
            /// 直接sql查询(返回的也是一对多的数据)
            /// </summary>
            /// <returns></returns>
            protected  IEnumerable<T> ExecuteQuery<T>(string sql) where T : class
            {
                IEnumerable<T> dd = dataContext.ExecuteQuery<T>(sql);
                return dd;//返回的也是一对多的数据
            }
            /// <summary>
            /// 直接SQL操作（增删改）
            /// </summary>
            /// <returns></returns>
            protected  int ExecuteCommand(string sql)
            {

                int status = dataContext.ExecuteCommand(sql);
                return status;
            }
            /// <summary>
            /// 全属性赋值（除了对象不赋值）
            /// </summary>
            /// <typeparam name="T"></typeparam>
            /// <typeparam name="K"></typeparam>
            /// <param name="sourceObject"></param>
            /// <param name="targetObject"></param>
            /// <returns></returns>
            public  T CopyObjectPoperty<T, K>(K sourceObject, T targetObject)
            {
                if (sourceObject == null)
                {
                    return default(T);
                }
                Type soutype = sourceObject.GetType();
                Type tartype = targetObject.GetType();
                PropertyInfo[] pis = soutype.GetProperties(BindingFlags.Public | BindingFlags.Instance);

                if (null != pis)
                {
                    foreach (PropertyInfo pi in pis)
                    {
                        string propertyname = pi.Name;
                        if (pi.PropertyType.IsValueType == true || pi.PropertyType.Name == "String")
                        {
                            PropertyInfo pit = tartype.GetProperty(propertyname);
                            if (pit != null && pi.PropertyType.FullName == pit.PropertyType.FullName)
                            {
                                pit.SetValue(targetObject, pi.GetValue(sourceObject, null), null);
                            }
                        }
                    }
                }
                return targetObject;
            }
            public  List<T> CopyObjectsPoperty<T, K>(List<K> sourceObjects)
            {
                List<T> targetObjects = new List<T>();
                for (int i = 0; i < sourceObjects.Count; i++)
                {
                    K sourceObject = sourceObjects[i];
                    //T targetObject = targetObjects[i];
                    T targetObject = System.Activator.CreateInstance<T>();
                    targetObjects.Add(CopyObjectPoperty<T, K>(sourceObject, targetObject));
                }
                return targetObjects;
            }
            //public int Updates<T>(List<T> objs, string key, params string[] keys) where T : class
            //{
            //    Type soutype = objs.GetType();
            //    PropertyInfo[] pis = soutype.GetProperties(BindingFlags.Public | BindingFlags.Instance);
            //    foreach (PropertyInfo pi in pis)
            //    {
            //        if (pi.PropertyType.FullName == key)
            //        {
            //            pi.GetValue(
            //            break;
            //        }
            //    }
            //    IQueryable<T> query = from i in dataContext.GetTable<T>() where objs.Select(ins => ins[key]).Contains(i[key]) select i;
            //    foreach (T q in objs)
            //    {
            //        TabShoppingList item = items.FirstOrDefault(ins => ins.sl_id == q.sl_id);
            //        q.sl_abid = item.sl_abid;
            //        q.sl_amount = item.sl_amount;
            //        q.sl_indate = item.sl_indate;
            //        q.sl_pname = item.sl_pname;
            //        q.sl_price = item.sl_price;
            //        q.sl_unit = item.sl_unit;
            //    }
            //    try
            //    {
            //        dataContext.SubmitChanges();
            //        return query.Count();
            //    }
            //    catch
            //    {
            //        return 0;
            //    }
            //}
        }
    
}
