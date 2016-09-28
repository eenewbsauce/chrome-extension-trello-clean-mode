# Chrome Extension for AWS

This simple extension is event-driven (webNavigation.onCompleted), without a long-running background process.

When it detects that you are logged into a PROD account, it turns the navbar RED

![Navbar](https://github.com/eenewbsauce/Chrome-Extension-AWS-PROD/navbar.png)

To detect your prod environment, simply change the {{placeholder}} text in `navigation-handler.js` to match a portion of your prod user name.

```
if (label.getAttribute('title').indexOf('{{placeholder}}') > 0) {
  document.querySelectorAll('body')[0].setAttribute('class', 'prod');
}
```
