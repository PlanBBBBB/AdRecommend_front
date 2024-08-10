import http from '../utils/request'
import router from '@/router';
import Cookies from 'js-cookie';
import store from '@/store'
import { Alert } from 'element-ui';

//管理员请求登录
export const landing = (username, password) => {
    console.log("开始登录")
    return http.post("/common/login", {
        // body传参
        username: username,
        password: password,
    })
        .then((response) => {
            console.log(response);
            console.log(username + password);
            if (!response.data.success) {
                alert(response.data.errorMsg)
            } else {
                console.log(response)
                // 存token
                localStorage.setItem("token", response.data.data)
                router.push('/home')
            }
        })
}


//用户请求登录
export const userLanding = (username, password) => {
    console.log("开始登录")
    return http.post("/common/login", {
        // body传参
        username: username,
        password: password,
    })
        .then((response) => {
            console.log(response);
            console.log(username + password);
            if (!response.data.success) {
                alert(response.data.errorMsg)
            } else {
                console.log(response)
                // 存token
                localStorage.setItem("token", response.data.data)
                router.push('/userIndex')
            }
        })
}

// 请求注册
export const registering = (username, password, name, interest) => {
    console.log("开始注册")
    return http.post("/common/register", {
        // body传参
        username: username,
        password: password,
        name: name,
        interest: interest
    })
        .then((response) => {
            console.log(response)
            if (!response.data.success) {
                alert(response.data.errorMsg)
            } else {
                console.log(response)
                alert("注册成功，请返回登录！")
                // 存Cokkies
                Cookies.set('token', response.data.data)
                router.push('/userLogin')
            }
        });
}

// 退出登录
export const outLanding = () => {
    console.log("退出登录")
    console.log(localStorage.getItem("token"))
    return http.get("/common/logout", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response)
        if (response.data.success) {
            alert(response.data.data)
            Cookies.remove("token")
            router.push('/login')
        } else {
            alert(response.data.errorMsg)
            Cookies.remove("token")
            router.push('/login')
        }
    })
}

// 查看用户个人资料
export const checking = (context) => {
    console.log("查看用户个人资料")
    return http.get("/user/check", {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg)
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token')
                router.push("/login")
            }
        } else {
            console.log("我在传参");
            const userInfo = response.data.data
            store.dispatch("fetchUserInfo", userInfo)
        }
    })
}

// 修改用户个人资料
export const modifying = (email, name, password) => {
    console.log("修改用户个人资料")
    console.log(localStorage.getItem("token"))
    return http.put("/user", {
        email: email,
        name: name,
        password: password
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    })
        .then((response) => {
            console.log(response)
            if (!response.data.success && response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token')
                router.push("/login")
                alert("认证失败请重新登录")
            } else {
                checking()
                alert(response.data.data)
            }
        })
}

// 上传文件
export const uploading = (file) => {
    console.log("上传文件")
    console.log(file)
    return http.post("/upload", {
        file: file
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response)
    })
}


// 用户分页模糊查询
export const pageUser = (userName, currentPage, pageSize, name) => {
    console.log("用户分页模糊查询");
    return http.post("/user/pageUser", {
        "userName": userName,
        "currentPage": currentPage,
        "pageSize": pageSize,
        "name": name
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg)
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token')
                router.push("/login")
            }
        } else {
            const bookInfo = response.data.data
            store.dispatch("fetchBookInfo", bookInfo)
        }
    })
}

// 广告分页模糊查询
export const pageAd = (isValid, startTime, endTime, currentPage, pageSize) => {
    console.log("广告分页模糊查询");
    return http.post("/ad/pageAd", {
        "isValid": isValid,
        "startTime": startTime,
        "endTime": endTime,
        "currentPage": currentPage,
        "pageSize": pageSize,
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg)
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token')
                router.push("/login")
            }
        } else {
            const bookInfo = response.data.data
            store.dispatch("fetchBookInfo", bookInfo)
        }
    })
}

// 行为分页模糊查询
export const pageBehavior = (action, currentPage, pageSize) => {
    console.log("行为分页模糊查询");
    return http.post("/behavior/pageBehavior", {
        "action": action,
        "currentPage": currentPage,
        "pageSize": pageSize,
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg)
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token')
                router.push("/login")
            }
        } else {
            const bookInfo = response.data.data
            store.dispatch("fetchBookInfo", bookInfo)
        }
    })
}

// 根据dictType查询字典
export const getDictByDictType = (id) => {
    console.log("根据dictType查询字典");
    return http.post("/common/getDictByDictType", {
        id: id
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg);
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token');
                router.push("/login");
            }
            throw new Error(response.data.errorMsg);
        } else {
            return response.data;  // 返回响应数据
        }
    }).catch((error) => {
        console.error("Failed to fetch data:", error);
        throw error;
    });
};

// 根据dictType查询字典包含子字典
export const getDictWithParent = (id) => {
    console.log("根据dictType查询字典");
    return http.post("/common/getDictWithParent", {
        id: id
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg);
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token');
                router.push("/login");
            }
            throw new Error(response.data.errorMsg);
        } else {
            return response.data;  // 返回响应数据
        }
    }).catch((error) => {
        console.error("Failed to fetch data:", error);
        throw error;
    });
};


// 获取当前推荐引擎
export const getCurrentEngine = () => {
    console.log("获取当前推荐引擎");
    return http.get("/engine/get", {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg);
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token');
                router.push("/login");
            }
            throw new Error(response.data.errorMsg);
        } else {
            return response.data;  // 返回响应数据
        }
    }).catch((error) => {
        console.error("Failed to fetch data:", error);
        throw error;
    });
};


//修改当前推荐引擎
export const updateCurrentEngine = (dictcode) => {
    console.log("修改当前推荐引擎");
    return http.post("/engine/change", {
        dictcode: dictcode
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg);
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token');
                router.push("/login");
            }
            throw new Error(response.data.errorMsg);
        } else {
            return response.data;  // 返回响应数据
        }
    }).catch((error) => {
        console.error("Failed to fetch data:", error);
        throw error;
    });
}

//根据id删除广告
export const deleteAdById = (id) => {
    console.log("删除广告");
    return http.post("/ad/delete", {
        id: id
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg);
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token');
                router.push("/login");
            }
            throw new Error(response.data.errorMsg);
        } else {
            return response.data;  // 返回响应数据
        }
    }).catch((error) => {
        console.error("Failed to fetch data:", error);
        throw error;
    });
}

// 新增广告
export const addAd = (keyWords, imgUrl, targetUrl, startTime, endTime, type, position) => {
    console.log("新增广告");
    return http.post("/ad/add", {
        keyWords: keyWords,
        imgUrl: imgUrl,
        targetUrl: targetUrl,
        startTime: startTime,
        endTime: endTime,
        type: type,
        position: position
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg);
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token');
                router.push("/login");
            }
            throw new Error(response.data.errorMsg);
        } else {
            return response.data;  // 返回响应数据
        }
    }).catch((error) => {
        console.error("Failed to fetch data:", error);
        throw error;
    });
}

// 更新广告
export const updateAd = (id, keyWords, imgUrl, targetUrl, startTime, endTime, type, position) => {
    console.log("更新广告");
    return http.post("/ad/update", {
        id: id,
        keyWords: keyWords,
        imgUrl: imgUrl,
        targetUrl: targetUrl,
        startTime: startTime,
        endTime: endTime,
        type: type,
        position: position
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg);
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token');
                router.push("/login");
            }
            throw new Error(response.data.errorMsg);
        } else {
            return response.data;  // 返回响应数据
        }
    }).catch((error) => {
        console.error("Failed to fetch data:", error);
        throw error;
    });
}


// 根据parentCode查询字典
export const getDictByParent = (id) => {
    console.log("根据dictType查询字典");
    return http.post("/common/getDictByParent", {
        id: id
    }, {
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
        if (!response.data.success) {
            alert(response.data.errorMsg);
            if (response.data.errorMsg === '认证失败请重新登录') {
                Cookies.remove('token');
                router.push("/login");
            }
            throw new Error(response.data.errorMsg);
        } else {
            return response.data;  // 返回响应数据
        }
    }).catch((error) => {
        console.error("Failed to fetch data:", error);
        throw error;
    });
};
