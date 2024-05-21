from django.urls import path
from . import views

urlpatterns = [
    path('sessionid-exist/', views.SessionStatus.as_view(), name='session-status'),
    path('update-password/', views.UpdatePassword.as_view(), name='update-password'),
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('user/', views.UserView.as_view(), name='user'),
    path('card-transaction-upload/', views.CardTransactionUpload.as_view(), name='card-transaction-upload'),
    path('card-transaction-history/', views.CardTransactionHistory.as_view(), name='card-transaction-history'),
    path('entire-card-transaction-history/', views.EntireCardTransactionHistory.as_view(), name='entire-card-transaction-history'),
    path('download-transaction/', views.DownloadTransactions.as_view(), name='download-tax-info'),
    path('upload-bank-transaction-list/', views.BankTransactionLists.as_view(), name='upload-bank-transaction-lists'),
    path('delete-card-data/', views.DeleteCardTransactions.as_view(), name='delete-card-data'),
    path('delete-bank-data/', views.DeleteBankTransactions.as_view(), name='delete-bank-data'),
    path('receipt-download/', views.DownloadReciptImages.as_view(), name='download_files'),
    path('missing-transaction-lists/', views.MyMissingTransactionLists.as_view(), name='my-missing-transaction-lists'),
    path('missing-bank-transaction-lists/', views.MyMissingBankTransactionLists.as_view(), name='my-missing-bank-transaction-lists'),
    path('matching-transaction-lists/', views.MyMatchingTransactionLists.as_view(), name='my-missing-bank-transaction-lists'),
    path('filter-by-dates/', views.FilterByDates.as_view(), name='filter-by-dates'),
    path('force-match/', views.ForceMatch.as_view(), name='force-match'),
    path('edit-transaction-information/', views.EditTransactionInformation.as_view(), name='edit-transaction-info'),
    path('status-bank-transactions/', views.StatusBankTransactions.as_view(), name='status-bank-transactions'),
    path('top-categories-count/', views.TopCategoriesCount.as_view(), name='top-categories-count'),
    path('department-credit-balance/', views.DepartmentCreditCardBalance.as_view(), name='department-credit-balance'),
    path('department-credit-card-limit/', views.DepartmentCreditCardLimit.as_view(), name='department-credit-card-limit'),
]